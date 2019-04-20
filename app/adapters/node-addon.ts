import DS from 'ember-data';
import OsfAdapter from './osf-adapter';

export default class NodeAddonAdapter extends OsfAdapter {
    buildURL(
        _: string | undefined,
        __: string | null,
        ___: DS.Snapshot | null,
        requestType: string,
        query?: {},
    ): string {
        const q: any = query!;
        const nodeId: string = q.context.node;
        const url = super.buildURL('node', null, null, requestType, {});
        return `${url}${nodeId}/addons/`;
    }
}

declare module 'ember-data/types/registries/adapter' {
    export default interface AdapterRegistry {
        'node-addon': NodeAddonAdapter;
    } // eslint-disable-line semi
}
