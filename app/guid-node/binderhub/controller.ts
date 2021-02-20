import Controller from '@ember/controller';
import EmberError from '@ember/error';
import { action, computed } from '@ember/object';
import { reads } from '@ember/object/computed';
import { later } from '@ember/runloop';
import { inject as service } from '@ember/service';

import DS from 'ember-data';

import Intl from 'ember-intl/services/intl';
import BinderHubConfigModel from 'ember-osf-web/models/binderhub-config';
import FileModel from 'ember-osf-web/models/file';
import FileProviderModel from 'ember-osf-web/models/file-provider';
import Node from 'ember-osf-web/models/node';
import Analytics from 'ember-osf-web/services/analytics';
import StatusMessages from 'ember-osf-web/services/status-messages';
import { addPathSegment } from 'ember-osf-web/utils/url-parts';
import Toast from 'ember-toastr/services/toast';

/* eslint-disable camelcase */
export interface BuildMessage {
    phase: string;
    message: string;
    authorization_url?: string;
    url?: string;
}
/* eslint-enable camelcase */

export default class GuidNodeBinderHub extends Controller {
    @service toast!: Toast;
    @service intl!: Intl;
    @service statusMessages!: StatusMessages;
    @service analytics!: Analytics;

    tab?: string;

    @reads('model.taskInstance.value')
    node?: Node;

    isPageDirty = false;

    configCache?: DS.PromiseObject<BinderHubConfigModel>;

    buildLog: BuildMessage[] | null = null;

    @computed('config.isFulfilled')
    get loading(): boolean {
        return !this.config || !this.config.get('isFulfilled');
    }

    @computed('tab')
    get activeTab() {
        return this.tab ? this.tab : 'editproject';
    }

    @action
    changeTab(activeId: string) {
        this.set('tab', activeId === 'editproject' ? undefined : activeId);
        this.analytics.click('tab', `BinderHub tab - Change tab to: ${activeId}`);
    }

    @action
    renewBinderHubToken(this: GuidNodeBinderHub) {
        if (!this.config) {
            throw new EmberError('Illegal config');
        }
        const config = this.config.content as BinderHubConfigModel;
        window.location.href = config.binderhub.authorize_url;
    }

    @action
    renewJupyterHubToken(this: GuidNodeBinderHub) {
        if (!this.config) {
            throw new EmberError('Illegal config');
        }
        const config = this.config.content as BinderHubConfigModel;
        if (!config.jupyterhub) {
            throw new EmberError('Illegal config');
        }
        window.location.href = config.jupyterhub.authorize_url;
    }

    @computed('node.files.[]')
    get defaultStorageProvider(): FileProviderModel | null {
        if (!this.node) {
            return null;
        }
        const providers = this.node.get('files').filter(f => f.name === 'osfstorage');
        if (providers.length === 0) {
            return null;
        }
        return providers[0];
    }

    @computed('defaultStorageProvider.rootFolder.files.[]')
    get defaultStorage(): FileModel | null {
        const provider = this.get('defaultStorageProvider');
        if (!provider) {
            return null;
        }
        return provider.get('rootFolder');
    }

    async performBuild(needsPersonalToken: boolean, callback: (result: BuildMessage) => void) {
        if (!this.node || !this.config) {
            throw new EmberError('Illegal config');
        }
        const nodeUrl = this.node.links.html as string;
        const config = this.config.content as BinderHubConfigModel;
        const { binderhub } = config;
        if (!binderhub || !binderhub.token) {
            throw new EmberError('Illegal config');
        }
        let additional = '';
        if (needsPersonalToken) {
            const scopeIds = ['osf.full_read', 'osf.full_write'];
            const scopes = await Promise.all(scopeIds.map(scopeId => this.store.findRecord('scope', scopeId)));
            const token = await this.store.createRecord('token', {
                name: `BinderHub addon ${new Date().toISOString()}`,
                scopes,
            });
            await token.save();
            additional = `&repo_token=${token.tokenValue}`;
        }
        const storageUrl = addPathSegment(nodeUrl, 'osfstorage');
        const encodedNodeUrl = encodeURIComponent(storageUrl);
        const buildUrl = addPathSegment(binderhub.url, `build/rdm/${encodedNodeUrl}/master`);
        const source = new EventSource(`${buildUrl}?token=${binderhub.token.access_token}${additional}`);
        source.onmessage = (message: MessageEvent) => {
            const data = JSON.parse(message.data) as BuildMessage;
            if (data.phase === 'auth' && data.authorization_url && !needsPersonalToken) {
                source.close();
                later(async () => {
                    await this.performBuild(true, callback);
                }, 0);
                return;
            }
            this.handleBuildMessage(source, data, callback);
        };
    }

    handleBuildMessage(source: EventSource, data: BuildMessage, callback: (result: BuildMessage) => void) {
        const logs: BuildMessage[] = (this.buildLog || []).map(elem => elem);
        logs.push(data);
        this.set('buildLog', logs);
        if (data.phase === 'ready' || data.phase === 'failed' || data.phase === 'failure') {
            source.close();
            if (!callback) {
                return;
            }
            callback(data);
        }
    }

    @computed('node')
    get config(): DS.PromiseObject<BinderHubConfigModel> | undefined {
        if (this.configCache) {
            return this.configCache;
        }
        if (!this.node) {
            return undefined;
        }
        this.configCache = this.store.findRecord('binderhub-config', this.node.id);
        return this.configCache!;
    }

    @action
    build(this: GuidNodeBinderHub, callback: (result: BuildMessage) => void) {
        this.set('buildLog', []);
        later(async () => {
            await this.performBuild(false, callback);
        }, 0);
    }
}

declare module '@ember/controller' {
    interface Registry {
        'guid-node/binderhub': GuidNodeBinderHub;
    }
}
