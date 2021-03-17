import Component from '@ember/component';
import EmberError from '@ember/error';
import { action, computed } from '@ember/object';
import DS from 'ember-data';
import { requiredAction } from 'ember-osf-web/decorators/component';
import { BootstrapPath, BuildMessage } from 'ember-osf-web/guid-node/binderhub/controller';
import BinderHubConfigModel from 'ember-osf-web/models/binderhub-config';

export default class BuildConsole extends Component {
    binderHubConfig: DS.PromiseObject<BinderHubConfigModel> & BinderHubConfigModel = this.binderHubConfig;

    buildLog: BuildMessage[] | null = this.buildLog;

    @requiredAction requestBuild!: (path: BootstrapPath | null, callback: (result: BuildMessage) => void) => void;

    @computed('buildLog')
    get buildLogLines(): string {
        if (!this.buildLog) {
            return '';
        }
        return this.buildLog.map(log => log.message).join('');
    }

    @computed('buildLog')
    get buildLogVisible(): boolean {
        if (!this.buildLog) {
            return false;
        }
        return true;
    }

    @action
    launch(this: BuildConsole, path: BootstrapPath | null) {
        this.performBuild(path);
    }

    performBuild(path: BootstrapPath | null) {
        if (!this.requestBuild) {
            return;
        }
        this.requestBuild(path, (result: BuildMessage) => {
            if (result.phase !== 'ready') {
                return;
            }
            this.performLaunch(result.url, result.token, path);
        });
    }

    performLaunch(originalUrl: string | undefined, token: string | undefined, targetPath: BootstrapPath | null) {
        if (!originalUrl || !token) {
            throw new EmberError('Missing parameters in the result');
        }
        // redirect a user to a running server with a token
        let url = originalUrl;
        if (targetPath && targetPath.path) {
            // strip trailing /
            url = url.replace(/\/$/, '');
            // trim leading '/'
            let path = targetPath.path.replace(/(^\/)/g, '');
            if (targetPath.pathType === 'file') {
                // trim trailing / on file paths
                path = path.replace(/(\/$)/g, '');
                // /tree is safe because it allows redirect to files
                // need more logic here if we support things other than notebooks
                url = `${url}/tree/${encodeURI(path)}`;
            } else {
                // pathType === 'url'
                url = `${url}/${path}`;
            }
        }
        const sep = url.includes('?') ? '&' : '?';
        url = `${url}${sep}token=${encodeURIComponent(token)}`;
        window.open(url, '_blank');
    }
}
