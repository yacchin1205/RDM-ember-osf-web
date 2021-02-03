import Component from '@ember/component';
import DS from 'ember-data';
import { requiredAction } from 'ember-osf-web/decorators/component';
import BinderHubConfigModel from 'ember-osf-web/models/binderhub-config';

export default class JupyterServersList extends Component {
    binderHubConfig: DS.PromiseObject<BinderHubConfigModel> & BinderHubConfigModel = this.binderHubConfig;

    @requiredAction renewToken!: () => void;

    didReceiveAttrs() {
        this.validateToken();
    }

    validateToken() {
        if (!this.binderHubConfig || !this.binderHubConfig.get('isFulfilled')) {
            return;
        }
        const binderhub = this.binderHubConfig.get('binderhub');
        if (!binderhub.token || (binderhub.token.expires_at && binderhub.token.expires_at * 1000 <= Date.now())) {
            return;
        }
        const jupyterhub = this.binderHubConfig.get('jupyterhub');
        if (jupyterhub && jupyterhub.token
            && (!jupyterhub.token.expires_at || jupyterhub.token.expires_at * 1000 > Date.now())) {
            return;
        }
        if (!this.renewToken) {
            return;
        }
        this.renewToken();
    }
}
