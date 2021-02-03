import DS from 'ember-data';
import OsfModel from './osf-model';

const { attr } = DS;

/* eslint-disable camelcase */
export interface Token {
    user?: string;
    access_token: string;
    expires_at: number | null;
}

export interface Service {
    url: string;
    authorize_url: string;
    token?: Token;
}

export interface Image {
    url: string;
    name: string;
    description: string;
}

export interface Deployment {
    images: Image[];
}
/* eslint-enable camelcase */

export default class BinderHubConfigModel extends OsfModel {
    @attr('object') binderhub!: Service;

    @attr('object') jupyterhub?: Service;

    @attr('object') deployment!: Deployment;
}

declare module 'ember-data/types/registries/model' {
    export default interface ModelRegistry {
        'binderhub-config': BinderHubConfigModel;
    } // eslint-disable-line semi
}
