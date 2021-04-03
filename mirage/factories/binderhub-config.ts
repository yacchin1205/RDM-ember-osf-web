import { Factory } from 'ember-cli-mirage';

import BinderHubConfigModel from 'ember-osf-web/models/binderhub-config';

export default Factory.extend<BinderHubConfigModel>({
});

declare module 'ember-cli-mirage/types/registries/schema' {
    export default interface MirageSchemaRegistry {
        myscreenConfigs: BinderHubConfigModel;
    } // eslint-disable-line semi
}
