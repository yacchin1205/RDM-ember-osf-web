import { action, computed } from '@ember-decorators/object';
import { reads } from '@ember-decorators/object/computed';
import { service } from '@ember-decorators/service';
import Controller from '@ember/controller';
import Analytics from 'ember-osf-web/services/analytics';

import DS from 'ember-data';

import I18N from 'ember-i18n/services/i18n';
import IQBRIMSStatusModel from 'ember-osf-web/models/iqbrims-status';
import Node from 'ember-osf-web/models/node';
import StatusMessages from 'ember-osf-web/services/status-messages';
import Toast from 'ember-toastr/services/toast';

export default class GuidNodeIQBRIMS extends Controller {
    @service toast!: Toast;
    @service i18n!: I18N;
    @service statusMessages!: StatusMessages;
    @service analytics!: Analytics;

    @computed('status.state')
    get modeDeposit() {
        if (!this.status || !this.status.get('isFulfilled')) {
            return false;
        }
        if (window.location.hash === '#deposit') {
            return true;
        }
        const status = this.status.content as IQBRIMSStatusModel;
        if (status.state === 'deposit') {
            return true;
        }
        return false;
    }

    @computed('status.state')
    get modeCheck() {
        if (!this.status || !this.status.get('isFulfilled')) {
            return false;
        }
        if (window.location.hash === '#check') {
            return true;
        }
        const status = this.status.content as IQBRIMSStatusModel;
        if (status.state === 'check') {
            return true;
        }
        return false;
    }

    statusCache?: DS.PromiseObject<IQBRIMSStatusModel>;

    @computed('node')
    get status(): DS.PromiseObject<IQBRIMSStatusModel> | undefined {
        if (this.statusCache) {
            return this.statusCache;
        }
        if (!this.node) {
            return undefined;
        }
        this.statusCache = this.store.findRecord('iqbrims-status', this.node.id);
        return this.statusCache!;
    }

    @reads('model.taskInstance.value')
    node?: Node;

    @action
    startDeposit(this: GuidNodeIQBRIMS) {
        this.set('modeDeposit', true);
    }

    @action
    startCheck(this: GuidNodeIQBRIMS) {
        this.set('modeCheck', true);
    }
}

declare module '@ember/controller' {
  interface Registry {
    'guid-node/iqbrims': GuidNodeIQBRIMS;
  }
}
