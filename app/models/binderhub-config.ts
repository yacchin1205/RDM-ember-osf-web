import EmberError from '@ember/error';
import DS from 'ember-data';
import { addPathSegment } from 'ember-osf-web/utils/url-parts';
import RSVP from 'rsvp';
import OsfModel from './osf-model';

const { attr } = DS;

/* eslint-disable camelcase */
export interface Token {
    user?: string;
    access_token: string;
    expires_at: number | null;
    token_type: string;
}

export interface Service {
    url: string;
    authorize_url: string;
    token?: Token;
    api_url?: string;
}

export interface Image {
    url: string;
    name: string;
    description: string;
    packages?: string[];
}

export interface Deployment {
    images: Image[];
}
/* eslint-enable camelcase */

export default class BinderHubConfigModel extends OsfModel {
    @attr('object') binderhub!: Service;

    @attr('object') jupyterhub?: Service;

    @attr('object') deployment!: Deployment;

    async jupyterhubAPIAJAX(apiPath: string) {
        const jupyterhub = this.get('jupyterhub');
        if (!jupyterhub || !jupyterhub.api_url || !jupyterhub.token) {
            throw new EmberError('Insufficient parameters');
        }
        const opts = {
            url: addPathSegment(jupyterhub.api_url, apiPath),
            headers: {
                Authorization: `${jupyterhub.token.token_type} ${jupyterhub.token.access_token}`,
            },
        };
        return new RSVP.Promise((resolve, reject) => $.ajax(opts).then(resolve).catch(reject));
    }
}

declare module 'ember-data/types/registries/model' {
    export default interface ModelRegistry {
        'binderhub-config': BinderHubConfigModel;
    } // eslint-disable-line semi
}
