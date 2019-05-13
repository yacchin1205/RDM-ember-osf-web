import { attr } from '@ember-decorators/data';
import OsfModel from './osf-model';

export default class IQBRIMSStatusModel extends OsfModel {
    @attr('string') state!: string;
    @attr('string') laboId?: string;
    @attr('string') contributorType?: string;
    @attr('string') acceptedDate?: string;
    @attr('string') journalName?: string;
    @attr('string') doi?: string;
    @attr('string') publishDate?: string;
    @attr('string') volume?: string;
    @attr('string') pageNumber?: string;
    @attr('fixstringarray') laboList?: string[];
}

declare module 'ember-data/types/registries/model' {
    export default interface ModelRegistry {
        'iqbrims-status': IQBRIMSStatusModel;
    } // eslint-disable-line semi
}
