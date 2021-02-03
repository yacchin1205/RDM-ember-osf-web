import Controller from '@ember/controller';
import EmberError from '@ember/error';
import { action, computed } from '@ember/object';
import { reads } from '@ember/object/computed';
import { inject as service } from '@ember/service';

import DS from 'ember-data';

import Intl from 'ember-intl/services/intl';
import BinderHubConfigModel from 'ember-osf-web/models/binderhub-config';
import FileModel from 'ember-osf-web/models/file';
import FileProviderModel from 'ember-osf-web/models/file-provider';
import Node from 'ember-osf-web/models/node';
import Analytics from 'ember-osf-web/services/analytics';
import StatusMessages from 'ember-osf-web/services/status-messages';
import Toast from 'ember-toastr/services/toast';

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

    /*
    saveError(config: BinderHubConfigModel) {
        config.rollbackAttributes();
        const message = this.intl.t('binderhub.failed_to_save');
        this.toast.error(message);
    }
    */

    /*
    set binder_url(v: string) {
        if (!this.config) {
            throw new EmberError('Illegal config');
        }
        const config = this.config.content as BinderHubConfigModel;
        config.set('binderUrl', v);
        this.set('isPageDirty', true);
    }
    */

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
}

declare module '@ember/controller' {
    interface Registry {
        'guid-node/binderhub': GuidNodeBinderHub;
    }
}
