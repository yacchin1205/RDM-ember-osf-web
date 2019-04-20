import { attr } from '@ember-decorators/data';
import OsfModel from './osf-model';

export default class IQBRIMSStatusModel extends OsfModel {
    @attr('string') state!: string;
}

declare module 'ember-data/types/registries/model' {
    export default interface ModelRegistry {
        'iqbrims-status': IQBRIMSStatusModel;
    } // eslint-disable-line semi
}
