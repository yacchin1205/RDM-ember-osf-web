import { tagName } from '@ember-decorators/component';
import { computed } from '@ember-decorators/object';
import Component from '@ember/component';
import { assert } from '@ember/debug';

import { layout } from 'ember-osf-web/decorators/component';
import SchemaBlockModel from 'ember-osf-web/models/schema-block';
import {
    getSchemaBlockGroups,
    RegistrationResponse,
    SchemaBlockGroup,
} from 'ember-osf-web/packages/registration-schema';
import template from './template';

@layout(template)
@tagName('')
export default class ReviewFormRenderer extends Component {
    // Required parameters
    schemaBlocks!: SchemaBlockModel[];
    registrationResponses!: RegistrationResponse;

    didReceiveAttrs() {
        assert(
            'reviewFormRenderer requires schemaBlocks to render',
            Boolean(this.schemaBlocks),
        );
        assert(
            'reviewFormRenderer requires registrationResponses to render',
            Boolean(this.registrationResponses),
        );
    }

    @computed('schemaBlocks.[]')
    get schemaBlockGroups(): SchemaBlockGroup[] {
        return getSchemaBlockGroups(this.schemaBlocks);
    }
}
