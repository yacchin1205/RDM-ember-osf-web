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
    multiSelect: boolean;
    value: FieldValueWithType | undefined;
    onChange: (valueWithType: FieldValueWithType) => void;
    disabled: boolean;
}

export default class ProjectMetadataSelector extends Component<ProjectMetadataSelectorArgs> {
    @service store!: DS.Store;

    @tracked draftRegistrations: DraftRegistration[] = [];
    @tracked registrations: Registration[] = [];
    @tracked selectedGuid: string | null = null;
    @tracked selectedGuids: string[] = [];
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
        if (!this.args.value) {
            return;
        }
        if (this.isMultiSelect) {
            if (this.selectedGuids.length > 0) {
                return;
            }
            const guids = this.extractGuidsFromValue(this.args.value);
            if (guids.length > 0) {
                this.selectedGuids = guids;
                this.notifyRecordsSelected(guids);
            }
        } else if (!this.selectedGuid) {
            const guid = this.extractGuidsFromValue(this.args.value)[0];
            if (guid) {
                this.selectedGuid = guid;
                this.notifyRecordSelected(guid);
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
        const value = this.buildValueForGuid(guid);
        this.args.onChange({
            value,
            type: 'json',
        });
    }

    private notifyRecordsSelected(guids: string[]): void {
        if (guids.length === 0) {
            this.args.onChange({
                value: null,
                type: 'json',
            });
            return;
        }
        const values = guids.map(guid => this.buildValueForGuid(guid));
        this.args.onChange({
            value: values,
            type: 'json',
        });
    }

    private buildValueForGuid(guid: string): ProjectMetadataValue {
        const draft = this.draftRegistrations.find(d => d.id === guid);
        const registration = this.registrations.find(r => r.id === guid);

        return {
            id: guid,
            data: draft ? draft.registrationMetadata : (registration ? registration.registeredMeta : {}),
        };
    }

    @action
    selectRecord(guid: string): void {
        if (this.args.disabled) {
            return;
        }
        if (this.isMultiSelect) {
            const hasGuid = this.selectedGuids.includes(guid);
            this.selectedGuids = hasGuid
                ? this.selectedGuids.filter(id => id !== guid)
                : [...this.selectedGuids, guid];
            this.notifyRecordsSelected(this.selectedGuids);
        } else {
            this.selectedGuid = guid;
            this.notifyRecordSelected(guid);
        }
    }

    @action
    refresh(): void {
        this.loadMetadataRecords.perform();
    }

    @action
    preventPropagation(event: Event): void {
        event.stopPropagation();
    }

    private extractGuidsFromValue(valueWithType: FieldValueWithType): string[] {
        if (valueWithType.type === 'json') {
            const raw = valueWithType.value;
            if (Array.isArray(raw)) {
                return raw
                    .map((item: ProjectMetadataValue) => item?.id)
                    .filter((id): id is string => Boolean(id));
            }
            if (raw && typeof raw === 'object') {
                const single = raw as ProjectMetadataValue;
                return single.id ? [single.id] : [];
            }
            return [];
        }
        const guid = toStringValue(valueWithType);
        return guid ? [guid] : [];
    }

    get isMultiSelect(): boolean {
        return this.args.multiSelect;
    }

    get allRecords() {
        const records = [
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
        return records.map(record => ({
            ...record,
            isSelected: this.isMultiSelect
                ? this.selectedGuids.includes(record.guid)
                : this.selectedGuid === record.guid,
        }));
    }
}
