import Component from '@ember/component';
import EmberError from '@ember/error';
import { action, computed } from '@ember/object';
import { later } from '@ember/runloop';
import { inject as service } from '@ember/service';
import DS from 'ember-data';
import { requiredAction } from 'ember-osf-web/decorators/component';
import BinderHubConfigModel from 'ember-osf-web/models/binderhub-config';
import FileModel from 'ember-osf-web/models/file';
import FileProviderModel from 'ember-osf-web/models/file-provider';
import CurrentUser from 'ember-osf-web/services/current-user';
import getHref from 'ember-osf-web/utils/get-href';
import md5 from 'js-md5';

enum DockerfileProperty {
    From,
    Apt,
}

export default class ProjectEditor extends Component {
    @service currentUser!: CurrentUser;

    binderHubConfig: DS.PromiseObject<BinderHubConfigModel> & BinderHubConfigModel = this.binderHubConfig;

    configFolder: FileModel = this.configFolder;

    configStorageProvider: FileProviderModel = this.configStorageProvider;

    loadingPath?: string;

    dockerfile: string = '';

    @requiredAction renewToken!: () => void;

    didReceiveAttrs() {
        if (!this.validateToken()) {
            return;
        }
        if (!this.configFolder || this.configFolder.get('path') === this.loadingPath) {
            return;
        }
        this.loadingPath = this.configFolder.get('path');
        later(async () => {
            await this.loadCurrentConfig();
        }, 0);
    }

    @computed('configFolder')
    get loading(): boolean {
        if (!this.configFolder) {
            return true;
        }
        return false;
    }

    @computed('binderHubConfig.deployment')
    get deployment() {
        if (!this.binderHubConfig || !this.binderHubConfig.get('isFulfilled')) {
            return null;
        }
        return this.binderHubConfig.get('deployment');
    }

    @computed('dockerfile')
    get manuallyChanged() {
        const dockerfile = this.get('dockerfile');
        const lines = dockerfile.split('\n');
        if (lines.length === 0) {
            return false;
        }
        const line = lines[0].match(/^# rdm-binderhub:hash:([a-z0-9]+)$/);
        if (!line) {
            return true;
        }
        const content = dockerfile.substring(line[0].length + 1);
        return md5(content.trim()) !== line[1];
    }

    updateDockerfile(key: DockerfileProperty, value: string) {
        // Update Dockerfile with MD5 hash
        const url = key === DockerfileProperty.From ? value : this.selectedImageUrl;
        let content = `FROM ${url}\n\n`;
        const baseAptPackages = this.aptPackages || [];
        const aptPackages = key === DockerfileProperty.Apt
            ? value.split(/\s/).filter(item => item.length > 0)
            : baseAptPackages.map(pkg => `${pkg[0]}:${pkg[1]}`);
        if (aptPackages.length > 0) {
            content += 'RUN apt-get update \\\n\t&& apt-get install -y --no-install-recommends \\\n';
            content += aptPackages.map(item => `\t\t${item} \\\n`).join('');
            content += '\t&& rm -rf /var/lib/apt/lists/*\n\n';
        }
        const checksum = md5(content.trim());
        const dockerfile = `# rdm-binderhub:hash:${checksum}\n${content}`;
        this.set('dockerfile', dockerfile);
        later(async () => {
            await this.saveCurrentConfig();
        }, 0);
    }

    @computed('dockerfile')
    get selectedImageUrl() {
        const dockerfile = this.get('dockerfile');
        if (this.manuallyChanged) {
            return null;
        }
        const fromStatements = dockerfile.split('\n')
            .filter(line => line.match(/^FROM\s+\S+\s*/));
        if (fromStatements.length === 0) {
            return null;
        }
        const fromStatement = fromStatements[0].match(/^FROM\s+(\S+)\s*/);
        if (!fromStatement) {
            return null;
        }
        return fromStatement[1];
    }

    @computed('dockerfile')
    get aptPackages() {
        const dockerfile = this.get('dockerfile');
        if (this.manuallyChanged) {
            return null;
        }
        const aptGetStatements = dockerfile.split('\n')
            .map((line, lineIndex) => [line, lineIndex] as [string, number])
            .filter(line => line[0].match(/^RUN\s+apt-get\s+update\s+\\\s*$/));
        if (aptGetStatements.length === 0) {
            return [];
        }
        const aptGetStatementIndex = aptGetStatements[0][1];
        const lines = dockerfile.split('\n').slice(aptGetStatementIndex);
        let aptGetLines = '';
        let prevBackslash: any = true;
        for (const line of lines) {
            const m = line.match(/(.*)\\\s*$/);
            aptGetLines += m ? m[1] : line.trim();
            if (!prevBackslash) {
                break;
            }
            prevBackslash = m;
        }
        const aptGetLinesMatch = aptGetLines.match(/.+apt-get\s+install\s+-y\s+--no-install-recommends\s+(.*)&&.+/);
        if (!aptGetLinesMatch) {
            throw new EmberError(`Unexpected commands: ${aptGetLines}`);
        }
        return aptGetLinesMatch[1].split(/\s+/)
            .map(item => item.trim())
            .filter(item => item.length > 0)
            .map(item => item.split('='))
            .map(item => (item.length > 1 ? [item[0], item[1]] : [item[0], '']));
    }

    validateToken() {
        if (!this.binderHubConfig || !this.binderHubConfig.get('isFulfilled')) {
            return true;
        }
        const binderhub = this.binderHubConfig.get('binderhub');
        if (binderhub.token && (!binderhub.token.expires_at || binderhub.token.expires_at * 1000 > Date.now())) {
            return true;
        }
        if (!this.renewToken) {
            return true;
        }
        this.renewToken();
        return false;
    }

    async getDockerfile() {
        if (!this.configFolder) {
            return null;
        }
        const files = await this.configFolder.get('files');
        const envFiles = files.filter(file => file.name === 'Dockerfile');
        if (envFiles.length === 0) {
            return null;
        }
        const envFile = await envFiles[0];
        return envFile;
    }

    async loadCurrentConfig() {
        const envFile = await this.getDockerfile();
        if (!envFile) {
            this.set('dockerfile', '');
            return;
        }
        const content = await envFile.getContents();
        this.set('dockerfile', content.toString());
    }

    async saveCurrentConfig() {
        const content = this.get('dockerfile');
        if (!content || !this.configFolder) {
            throw new EmberError('Illegal config');
        }
        const envFile = await this.getDockerfile();
        if (!envFile) {
            const name = 'Dockerfile';
            const links = this.configStorageProvider.get('links');
            await this.currentUser.authenticatedAJAX({
                url: `${getHref(links.upload)}?name=${name}`,
                type: 'PUT',
                xhrFields: { withCredentials: true },
                data: content,
            });
            return;
        }
        await envFile.updateContents(content);
    }

    @action
    selectImage(this: ProjectEditor, url: string) {
        this.updateDockerfile(DockerfileProperty.From, url);
    }

    @action
    aptUpdated(this: ProjectEditor, packages: Array<[string, string]>) {
        this.updateDockerfile(DockerfileProperty.Apt, packages.map(pkg => `${pkg[0]}=${pkg[1]}`).join(' '));
    }
}
