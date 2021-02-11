import Component from '@ember/component';
import EmberError from '@ember/error';
import { action, computed } from '@ember/object';
import { later } from '@ember/runloop';
import DS from 'ember-data';
import { requiredAction } from 'ember-osf-web/decorators/component';
import BinderHubConfigModel from 'ember-osf-web/models/binderhub-config';
import Node from 'ember-osf-web/models/node';
import { addPathSegment } from 'ember-osf-web/utils/url-parts';
import RSVP from 'rsvp';

/* eslint-disable camelcase */
export interface JupyterServerOptions {
    binder_persistent_request?: string;
}

export interface JupyterServer {
    name: string;
    last_activity?: string | null;
    started?: string | null;
    pending?: string | null;
    ready?: boolean;
    url: string;
    user_options?: JupyterServerOptions | null;
}
/* eslint-enable camelcase */

export default class JupyterServersList extends Component {
    binderHubConfig: DS.PromiseObject<BinderHubConfigModel> & BinderHubConfigModel = this.binderHubConfig;

    @requiredAction renewToken!: () => void;

    initialized: boolean = false;

    node?: Node | null = null;

    servers: JupyterServer[] | null = null;

    didReceiveAttrs() {
        if (!this.validateToken()) {
            return;
        }
        if (!this.node) {
            return;
        }
        if (this.initialized) {
            return;
        }
        this.initialized = true;
        later(async () => {
            const servers = await this.loadServers();
            this.set('servers', servers);
        }, 0);
    }

    @computed('servers')
    get loading(): boolean {
        if (!this.servers) {
            return true;
        }
        return false;
    }

    validateToken() {
        if (!this.binderHubConfig || !this.binderHubConfig.get('isFulfilled')) {
            return false;
        }
        const binderhub = this.binderHubConfig.get('binderhub');
        if (!binderhub.token || (binderhub.token.expires_at && binderhub.token.expires_at * 1000 <= Date.now())) {
            return false;
        }
        const jupyterhub = this.binderHubConfig.get('jupyterhub');
        if (jupyterhub && jupyterhub.token
            && (!jupyterhub.token.expires_at || new Date(jupyterhub.token.expires_at).getTime() > Date.now())) {
            return true;
        }
        if (!this.renewToken) {
            return false;
        }
        this.renewToken();
        return false;
    }

    async loadServers(): Promise<JupyterServer[]> {
        if (!this.binderHubConfig || !this.binderHubConfig.get('isFulfilled')) {
            throw new EmberError('Illegal config');
        }
        const jupyterhub = this.binderHubConfig.get('jupyterhub');
        if (!jupyterhub || !jupyterhub.api_url || !jupyterhub.token) {
            throw new EmberError('Insufficient parameters');
        }
        const opts = {
            url: addPathSegment(jupyterhub.api_url, `users/${jupyterhub.token.user}`),
            headers: {
                Authorization: `${jupyterhub.token.token_type} ${jupyterhub.token.access_token}`,
            },
        };
        const ajax = new RSVP.Promise((resolve, reject) => $.ajax(opts).then(resolve).catch(reject));
        const response = await ajax;
        const result = response as any;
        if (result.servers === undefined || result.servers === null) {
            throw new EmberError('Unexpected object');
        }
        const serverNames: string[] = Object.keys(result.servers).map(key => key as string);
        serverNames.sort();
        const servers = serverNames.map(serverName => result.servers[serverName] as JupyterServer);
        return servers.filter(server => this.isTarget(server));
    }

    isTarget(server: JupyterServer) {
        if (!server.user_options || !server.user_options.binder_persistent_request) {
            return false;
        }
        if (!this.node) {
            return false;
        }
        const pathMatched = server.user_options.binder_persistent_request.match(/^v[0-9]+\/rdm\/(.+)\/([a-z]+)$/);
        if (!pathMatched) {
            return false;
        }
        const url = new URL(decodeURIComponent(pathMatched[1]));
        const osfPathMatched = url.pathname.match(/^\/([a-z0-9A-Z]+)\/.*/);
        if (!osfPathMatched) {
            return false;
        }
        return osfPathMatched[1] === this.node.id;
    }

    @action
    openServer(this: JupyterServersList, server: JupyterServer) {
        const binderHubConfig = this.get('binderHubConfig');
        const jupyterhub = binderHubConfig.get('jupyterhub');
        if (!jupyterhub) {
            throw new EmberError('Illegal config');
        }
        const url = new URL(jupyterhub.url);
        url.pathname = server.url;
        window.open(url.toString(), '_blank');
    }
}
