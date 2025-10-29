import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import DS from 'ember-data';
import { task } from 'ember-concurrency-decorators';
import config from 'ember-get-config';

import Node from 'ember-osf-web/models/node';
import DraftRegistration from 'ember-osf-web/models/draft-registration';
import Registration from 'ember-osf-web/models/registration';
import { Answer } from 'ember-osf-web/models/registration-schema';
import { FieldValueWithType } from '../types';
import { toStringValue } from '../field/component';
import pathJoin from 'ember-osf-web/utils/path-join';

const { OSF: { url: baseURL } } = config;

interface ProjectMetadataValue {
    id: string;
    data: {
        [qid: string]: Answer<unknown>;
    };
}

interface ProjectMetadataSelectorArgs {
    node: Node;
    schemaName: string;
    value: FieldValueWithType | undefined;
    onChange: (valueWithType: FieldValueWithType) => void;
    disabled: boolean;
}

export default class ProjectMetadataSelector extends Component<ProjectMetadataSelectorArgs> {
    @service store!: DS.Store;

    @tracked draftRegistrations: DraftRegistration[] = [];
    @tracked registrations: Registration[] = [];
    @tracked selectedGuid: string | null = null;
    @tracked isInitialized: boolean = false;

    @action
    initialize() {
        if (!this.isInitialized) {
            this.isInitialized = true;
            this.loadMetadataRecords.perform();
        }
    }

    @action
    updateValue() {
        if (this.args.value && !this.selectedGuid) {
            if (this.args.value.type === 'json') {
                const parsed = this.args.value.value as ProjectMetadataValue;
                this.selectedGuid = parsed.id;
            } else {
                this.selectedGuid = toStringValue(this.args.value);
            }
            if (this.selectedGuid) {
                this.notifyRecordSelected(this.selectedGuid);
            }
        }
    }

    @task
    loadMetadataRecords = task(function *(this: ProjectMetadataSelector) {
        const node = this.args.node;

        // Load draft registrations
        const drafts: DraftRegistration[] = yield node.loadAll('draftRegistrations');

        // Load registration schemas for all drafts
        for (const draft of drafts) {
            yield draft.registrationSchema;
        }

        this.draftRegistrations = drafts.filter(
            draft => draft.registrationSchema.get('name') === this.args.schemaName
        );

        // Load registrations
        const regs: Registration[] = yield node.loadAll('registrations');

        // Load registration schemas for all registrations
        for (const reg of regs) {
            yield reg.registrationSchema;
        }

        this.registrations = regs.filter(
            reg => reg.registrationSchema.get('name') === this.args.schemaName
        );
    });

    private notifyRecordSelected(guid: string): void {
        const draft = this.draftRegistrations.find(d => d.id === guid);
        const registration = this.registrations.find(r => r.id === guid);

        const value: ProjectMetadataValue = {
            id: guid,
            data: draft ? draft.registrationMetadata : (registration ? registration.registeredMeta : {}),
        };

        this.args.onChange({
            value,
            type: 'json',
        });
    }

    @action
    selectRecord(guid: string): void {
        if (this.args.disabled) {
            return;
        }
        this.selectedGuid = guid;
        this.notifyRecordSelected(guid);
    }

    @action
    refresh(): void {
        this.loadMetadataRecords.perform();
    }

    @action
    preventPropagation(event: Event): void {
        event.stopPropagation();
    }

    get allRecords() {
        return [
            ...this.draftRegistrations.map(draft => ({
                guid: draft.id,
                title: draft.title,
                dateCreated: draft.datetimeInitiated,
                dateModified: draft.datetimeUpdated,
                isDraft: true,
                url: pathJoin(baseURL, 'registries', 'drafts', draft.id, 'metadata'),
            })),
            ...this.registrations.map(reg => ({
                guid: reg.id,
                title: reg.title,
                dateCreated: reg.dateCreated,
                dateModified: reg.dateModified,
                isDraft: false,
                url: null,
            })),
        ];
    }
}
