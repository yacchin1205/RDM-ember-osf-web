import { attr } from '@ember-decorators/data';
import OsfModel from './osf-model';

export default class NodeAddonModel extends OsfModel {
    @attr('boolean') configured!: boolean;
}

declare module 'ember-data/types/registries/model' {
    export default interface ModelRegistry {
        'node-addon': NodeAddonModel;
    } // eslint-disable-line semi
}
