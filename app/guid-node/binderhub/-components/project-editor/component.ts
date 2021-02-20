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
    Conda,
    Pip,
}

function getAptPackageId(pkg: string[]) {
    return pkg[1].length > 0 ? `${pkg[0]}=${pkg[1]}` : pkg[0];
}

function parseAptPackageId(id: string) {
    const item = id.split('=');
    return item.length > 1 ? [item[0], item[1]] : [item[0], ''];
}

function getCondaPackageId(pkg: string[]) {
    return pkg[1].length > 0 ? `${pkg[0]}==${pkg[1]}` : pkg[0];
}

function parseCondaPackageId(id: string) {
    const pos = id.indexOf('==');
    if (pos < 0) {
        return [id, ''];
    }
    return [id.substring(0, pos), id.substring(pos + 2)];
}

function getPipPackageId(pkg: string[]) {
    return getCondaPackageId(pkg);
}

function parsePipPackageId(id: string) {
    return parseCondaPackageId(id);
}

export default class ProjectEditor extends Component {
    @service currentUser!: CurrentUser;

    binderHubConfig: DS.PromiseObject<BinderHubConfigModel> & BinderHubConfigModel = this.binderHubConfig;

    configFolder: FileModel = this.configFolder;

    dockerfileModel: FileModel | null = this.dockerfileModel;

    configStorageProvider: FileProviderModel = this.configStorageProvider;

    showResetDockerfileConfirmDialog = false;

    imageSelectable = false;

    loadingPath?: string;

    dockerfile: string | undefined = undefined;

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

    @computed('configFolder', 'dockerfile')
    get loading(): boolean {
        if (!this.configFolder) {
            return true;
        }
        if (this.dockerfile === undefined) {
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
        if (dockerfile === undefined) {
            return false;
        }
        const lines = dockerfile.split('\n');
        if (lines.length === 0 || (lines.length === 1 && lines[0].trim() === '')) {
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
            : baseAptPackages.map(pkg => getAptPackageId(pkg));
        const baseCondaPackages = this.condaPackages || [];
        const condaPackages = key === DockerfileProperty.Conda
            ? value.split(/\s/).filter(item => item.length > 0)
            : baseCondaPackages.map(pkg => getCondaPackageId(pkg));
        const basePipPackages = this.pipPackages || [];
        const pipPackages = key === DockerfileProperty.Pip
            ? value.split(/\s/).filter(item => item.length > 0)
            : basePipPackages.map(pkg => getPipPackageId(pkg));
        const superuser = aptPackages.length > 0
            || (condaPackages.length > 0 && this.condaSupported)
            || (pipPackages.length > 0 && this.pipSupported);
        if (superuser) {
            content += 'USER root\n';
        }
        if (aptPackages.length > 0) {
            content += 'RUN apt-get update \\\n\t&& apt-get install -y --no-install-recommends \\\n';
            content += aptPackages.map(item => `\t\t${item} \\\n`).join('');
            content += '\t&& rm -rf /var/lib/apt/lists/*\n\n';
        }
        if (condaPackages.length > 0 && this.condaSupported) {
            content += 'RUN conda install -y \\\n';
            content += condaPackages.map(item => `\t\t${item} \\\n`).join('');
            content += '\t&& conda clean -ya\n\n';
        }
        if (pipPackages.length > 0 && this.pipSupported) {
            content += 'RUN pip install -U --no-cache-dir \\\n\t\t';
            content += pipPackages.map(item => `${item} `).join(' \\\n\t\t');
            content += '\n\n';
        }
        if (superuser) {
            content += 'USER $NB_USER\n';
        }
        content += 'COPY * .\n';
        const checksum = md5(content.trim());
        const dockerfile = `# rdm-binderhub:hash:${checksum}\n${content}`;
        this.set('dockerfile', dockerfile);
        later(async () => {
            await this.saveCurrentConfig();
        }, 0);
    }

    @computed('dockerfile')
    get selectedImageUrl() {
        if (this.manuallyChanged) {
            return null;
        }
        const dockerfile = this.get('dockerfile');
        if (dockerfile === undefined) {
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

    @computed('selectedImage', 'deployment', 'imageSelectable')
    get selectableImages() {
        const deployment = this.get('deployment');
        if (!deployment) {
            return [];
        }
        const image = this.get('selectedImage');
        if (image === null) {
            return deployment.images;
        }
        if (this.get('imageSelectable')) {
            return deployment.images;
        }
        return [image];
    }

    @computed('selectedImageUrl', 'deployment')
    get selectedImage() {
        const url = this.get('selectedImageUrl');
        if (url === null) {
            return null;
        }
        const deployment = this.get('deployment');
        if (!deployment) {
            throw new EmberError('Illegal config');
        }
        const images = deployment.images.filter(image => image.url === url);
        if (images.length === 0) {
            throw new EmberError(`Undefined image: ${url}`);
        }
        return images[0];
    }

    @computed('selectedImage')
    get condaSupported() {
        const image = this.get('selectedImage');
        if (image === null || !image.packages) {
            return false;
        }
        return image.packages.includes('conda');
    }

    @computed('selectedImage')
    get pipSupported() {
        const image = this.get('selectedImage');
        if (image === null || !image.packages) {
            return false;
        }
        return image.packages.includes('pip');
    }

    @computed('dockerfileStatements')
    get aptPackages() {
        const dockerfileStatements = this.get('dockerfileStatements');
        if (dockerfileStatements === null) {
            return null;
        }
        const aptGetLines = dockerfileStatements
            .filter(line => line.match(/^RUN\s+apt-get\s+update\s+.*$/));
        if (aptGetLines.length === 0) {
            return [];
        }
        const aptGetLinesMatch = aptGetLines[0]
            .match(/.+apt-get\s+install\s+-y\s+--no-install-recommends\s+(.*)&&.+/);
        if (!aptGetLinesMatch) {
            throw new EmberError(`Unexpected commands: ${aptGetLines}`);
        }
        return aptGetLinesMatch[1].split(/\s+/)
            .map(item => item.trim())
            .filter(item => item.length > 0)
            .map(item => parseAptPackageId(item));
    }

    @computed('dockerfileStatements')
    get condaPackages() {
        const dockerfileStatements = this.get('dockerfileStatements');
        if (dockerfileStatements === null) {
            return null;
        }
        const statements = dockerfileStatements
            .map(line => line.match(/^RUN\s+conda\s+install\s+-y\s+(.*)&&.+$/))
            .map(match => (match ? match[1] : null))
            .filter(match => match !== null);
        if (statements.length === 0) {
            return [];
        }
        const statement = statements[0] as string;
        return statement.split(/\s+/)
            .map(item => item.trim())
            .filter(item => item.length > 0)
            .map(item => parseCondaPackageId(item));
    }

    @computed('dockerfileStatements')
    get pipPackages() {
        const dockerfileStatements = this.get('dockerfileStatements');
        if (dockerfileStatements === null) {
            return null;
        }
        const statements = dockerfileStatements
            .map(line => line.match(/^RUN\s+pip\s+install\s+-U\s+--no-cache-dir\s+(.*)$/))
            .map(match => (match ? match[1] : null))
            .filter(match => match !== null);
        if (statements.length === 0) {
            return [];
        }
        const statement = statements[0] as string;
        return statement.split(/\s+/)
            .map(item => item.trim())
            .filter(item => item.length > 0)
            .map(item => parsePipPackageId(item));
    }

    @computed('dockerfile')
    get dockerfileStatements() {
        if (this.manuallyChanged) {
            return null;
        }
        const dockerfile = this.get('dockerfile');
        if (dockerfile === undefined) {
            return null;
        }
        const lines = dockerfile.split('\n');
        let statement: string | null = null;
        const statements: string[] = [];
        for (const line of lines) {
            const m = line.match(/(.*)\\\s*$/);
            const statementPart = m ? m[1] : line.trim();
            statement = (statement || '') + statementPart;
            if (m) {
                continue;
            }
            statements.push(statement);
            statement = null;
        }
        if (statement !== null) {
            statements.push(statement);
        }
        return statements;
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
        if (!files) {
            return null;
        }
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
            this.set('dockerfileModel', null);
            this.set('dockerfile', '');
            return;
        }
        const content = await envFile.getContents();
        this.set('dockerfileModel', envFile);
        this.set('dockerfile', content.toString());
    }

    async saveCurrentConfig() {
        const content: string | undefined = this.get('dockerfile');
        if (content === undefined) {
            throw new EmberError('Illegal config');
        }
        if (!this.configFolder) {
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

    async performResetDockerfile() {
        if (!this.dockerfileModel) {
            throw new EmberError('Illegal config');
        }
        const links = this.dockerfileModel.get('links');
        await this.currentUser.authenticatedAJAX({
            url: getHref(links.delete),
            type: 'DELETE',
            xhrFields: { withCredentials: true },
        });
        this.set('dockerfileModel', null);
        this.set('dockerfile', '');
        window.location.reload();
    }

    @action
    selectImage(this: ProjectEditor, url: string) {
        this.set('imageSelectable', false);
        this.updateDockerfile(DockerfileProperty.From, url);
    }

    @action
    aptUpdated(this: ProjectEditor, packages: Array<[string, string]>) {
        this.updateDockerfile(
            DockerfileProperty.Apt,
            packages.map(pkg => getAptPackageId(pkg)).join(' '),
        );
    }

    @action
    condaUpdated(this: ProjectEditor, packages: Array<[string, string]>) {
        this.updateDockerfile(
            DockerfileProperty.Conda,
            packages.map(pkg => getCondaPackageId(pkg)).join(' '),
        );
    }

    @action
    pipUpdated(this: ProjectEditor, packages: Array<[string, string]>) {
        this.updateDockerfile(
            DockerfileProperty.Pip,
            packages.map(pkg => getPipPackageId(pkg)).join(' '),
        );
    }

    @action
    viewDockerfile(this: ProjectEditor) {
        if (!this.dockerfileModel) {
            throw new EmberError('Illegal config');
        }
        const fileUrl = this.dockerfileModel.get('links').html as string;
        window.open(fileUrl, '_blank');
    }

    @action
    resetDockerfile(this: ProjectEditor) {
        later(async () => {
            await this.performResetDockerfile();
        }, 0);
    }
}
