import { attr, belongsTo } from '@ember-decorators/data';
import OsfModel from './osf-model';
import DS from 'ember-data';

import NodeModel from './node';

export default class NodeAddonModel extends OsfModel {
    @belongsTo('node', { inverse: 'addons', polymorphic: true })
    node!: DS.PromiseObject<NodeModel> & NodeModel;

    @attr('boolean') configured!: boolean;
}

declare module 'ember-data/types/registries/model' {
    export default interface ModelRegistry {
        'node-addon': NodeAddonModel;
    } // eslint-disable-line semi
}
