import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import DS from 'ember-data';
import { task } from 'ember-concurrency-decorators';
import config from 'ember-get-config';

import Node from 'ember-osf-web/models/node';
import MetadataNodeProject, { FileEntry, MetadataValue, MetadataItem } from 'ember-osf-web/models/metadata-node-project';
import MetadataNodeSchema from 'ember-osf-web/models/metadata-node-schema';
import RegistrationSchema from 'ember-osf-web/models/registration-schema';
import { FieldValueWithType } from '../types';
import pathJoin from 'ember-osf-web/utils/path-join';

const { OSF: { url: baseURL } } = config;

interface FileMetadataValue {
    id: string;
    data: {
        [key: string]: MetadataValue;
    };
}

interface FileMetadataEntry {
    path: string;
    parts: string[];
    lastPart: string;
    lastPartDepth: number;
    folder: boolean;
    title: string | null;
    manager: string | null;
    url: string;
    style: string;
    visible: boolean;
    folderExpanded: boolean;
}

interface FileMetadataSelectorArgs {
    node: Node;
    schemaName: string;
    value: string | null;
    onChange: (valueWithType: FieldValueWithType) => void;
    disabled: boolean;
}

export default class FileMetadataSelector extends Component<FileMetadataSelectorArgs> {
    @service store!: DS.Store;

    @tracked metadataNodeProject: MetadataNodeProject | null = null;
    @tracked metadataNodeSchema: MetadataNodeSchema | null = null;
    @tracked registrationSchema: RegistrationSchema | null = null;
    @tracked selectedPath: string | null = null;
    @tracked folderExpands: {[key: string]: boolean} = {};

    constructor(owner: unknown, args: FileMetadataSelectorArgs) {
        super(owner, args);
        if (args.value) {
            const parsed = JSON.parse(args.value) as FileMetadataValue;
            this.selectedPath = parsed.id;
        }
        this.loadFileMetadata.perform();
    }

    @task
    loadFileMetadata = task(function *(this: FileMetadataSelector) {
        const node = this.args.node;
        this.metadataNodeProject = yield this.store.findRecord('metadata-node-project', node.id);
        this.metadataNodeSchema = yield this.store.findRecord('metadata-node-schema', node.id);

        // Load all registration schemas with pagination
        const allSchemas: RegistrationSchema[] = [];
        let page = 1;
        while (true) {
            const result = yield this.store.query('registration-schema', { page });
            Array.prototype.push.apply(allSchemas, result.toArray());
            if (!result.links.next) { break; }
            page += 1;
        }
        this.registrationSchema = allSchemas.find(s => s.name === this.args.schemaName) || null;
    });

    @action
    selectFile(path: string): void {
        if (this.args.disabled) {
            return;
        }
        this.selectedPath = path;

        // Find the selected file/folder metadata
        const entry = this.metadataNodeProject?.files.find((f: FileEntry) => f.path === path);
        const item = entry?.items.find((it: MetadataItem) => it.schema === this.schemaId);

        const value: FileMetadataValue = {
            id: path,
            data: item ? item.data : {},
        };

        this.args.onChange({
            value,
            type: 'json',
        });
    }

    @action
    refresh(): void {
        this.loadFileMetadata.perform();
    }

    @action
    preventPropagation(event: Event): void {
        event.stopPropagation();
    }

    @action
    expandFolder(entry: FileMetadataEntry, expand: boolean): void {
        this.folderExpands[entry.path] = expand;
        this.folderExpands = { ...this.folderExpands };
    }

    get projectUrl(): string {
        return pathJoin(baseURL, this.args.node.id);
    }

    get schemaId(): string | null {
        if (!this.registrationSchema) {
            return null;
        }
        return this.registrationSchema.id;
    }

    get projectFilePaths(): string[] {
        if (!this.metadataNodeProject || !this.schemaId) {
            return [];
        }

        const pathSet = new Set<string>();
        this.metadataNodeProject.files.forEach((entry: FileEntry) => {
            const item = entry.items.find(it => it.schema === this.schemaId);
            if (item) {
                let path = '';
                const parts = entry.path.split('/');
                parts.forEach((part, i) => {
                    if (!part.length) {
                        return;
                    }
                    path += part;
                    if (i + 1 < parts.length) {
                        path += '/';
                    }
                    pathSet.add(path);
                });
            }
        });
        return Array.from(pathSet).sort((a: string, b: string) => a.localeCompare(b));
    }

    get fileEntries(): FileMetadataEntry[] {
        if (!this.metadataNodeProject || !this.schemaId) {
            return [];
        }

        // Create a map of file metadata by path
        const metadataMap: {[key: string]: { title: string | null; manager: string | null; urlpath: string }} = {};
        this.metadataNodeProject.files.forEach((entry: FileEntry) => {
            const item = entry.items.find(it => it.schema === this.schemaId);
            if (item) {
                const titleJa = item.data['grdm-file:title-ja'];
                const titleEn = item.data['grdm-file:title-en'];
                const managerJa = item.data['grdm-file:data-man-name-ja'];
                const managerEn = item.data['grdm-file:data-man-name-en'];

                let title = null;
                if (titleJa?.value) {
                    title = titleJa.value;
                } else if (titleEn?.value) {
                    title = titleEn.value;
                }

                let manager = null;
                if (managerJa?.value) {
                    manager = managerJa.value;
                } else if (managerEn?.value) {
                    manager = managerEn.value;
                }

                metadataMap[entry.path] = { title, manager, urlpath: entry.urlpath };
            }
        });

        // Build tree structure
        const paths = this.projectFilePaths;
        return paths.map(path => {
            const metadata = metadataMap[path];
            const parts = path.split('/');
            if (!parts[parts.length - 1].length) {
                parts.pop();
            }
            const folder = path.match(/.+\/$/) !== null;

            // Initialize folder expansion for top-level folders
            if (folder && parts.length === 1 && this.folderExpands[path] === undefined) {
                this.folderExpands[path] = true;
            }

            return {
                path,
                parts,
                lastPart: parts[parts.length - 1],
                lastPartDepth: parts.length,
                folder,
                title: metadata ? metadata.title : null,
                manager: metadata ? metadata.manager : null,
                url: metadata ? `${pathJoin(baseURL, metadata.urlpath)}#edit-metadata` : '',
                style: `margin: 0 0 0 ${parts.length * 20 + (folder ? 0 : 24)}px`,
                visible: [...parts.slice(0, parts.length - 1).keys()]
                    .every(i => this.folderExpands[`${parts.slice(0, i + 1).join('/')}/`]),
                folderExpanded: this.folderExpands[path] || false,
            } as FileMetadataEntry;
        });
    }
}
