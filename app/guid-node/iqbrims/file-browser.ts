import EmberObject from '@ember/object';

import { action, computed } from '@ember-decorators/object';
import { A } from '@ember/array';
import { later } from '@ember/runloop';
import { all, task, timeout } from 'ember-concurrency';

import File from 'ember-osf-web/models/file';
import Node from 'ember-osf-web/models/node';

import GuidNodeIQBRIMS from './controller';

export default class IQBRIMSFileBrowser extends EmberObject {
    folderName: string;
    owner: GuidNodeIQBRIMS;

    filter: string = this.filter || '';
    sort: string = this.sort || 'name';
    newFolderRequest?: object;

    updateFilter = task(function *(this: IQBRIMSFileBrowser, filter: string) {
        yield timeout(250);
        this.filter = filter;
    }).restartable();

    flash = task(function *(item: File, message: string, type: string = 'success', duration: number = 2000) {
        item.set('flash', { message, type });
        yield timeout(duration);
        item.set('flash', null);
    });

    addFile = task(function *(this: IQBRIMSFileBrowser, id: string) {
        const allFiles = this.get('allFiles');
        if (!allFiles) {
            return;
        }
        const duplicate = allFiles.findBy('id', id);

        const file = yield this.owner.get('store')
            .findRecord('file', id, duplicate ? {} : { adapterOptions: { query: { create_guid: 1 } } });

        if (duplicate) {
            allFiles.removeObject(duplicate);
        }

        allFiles.pushObject(file);

        if (duplicate) {
            return;
        }

        const i18n = this.owner.get('i18n');
        this.owner.get('toast').success(i18n.t('file_browser.file_added_toast'));
        this.get('flash').perform(file, i18n.t('file_browser.file_added'));
    });

    deleteFile = task(function *(this: IQBRIMSFileBrowser, file: File) {
        try {
            yield file.destroyRecord();
            yield this.get('flash').perform(file, this.owner.get('i18n').t('file_browser.file_deleted'), 'danger');
            const allFiles = this.get('allFiles');
            if (!allFiles) {
                return;
            }
            allFiles.removeObject(file);
        } catch (e) {
            yield this.get('flash').perform(file, this.owner.get('i18n').t('file_browser.delete_failed'), 'danger');
        }
    });

    deleteFiles = task(function *(this: IQBRIMSFileBrowser, files: File[]) {
        const deleteFile = this.get('deleteFile');

        yield all(files.map(file => deleteFile.perform(file)));
    });

    moveFile = task(function *(this: IQBRIMSFileBrowser, file: File, node: Node): IterableIterator<any> {
        try {
            yield file.move(node);
            yield this.get('flash').perform(file, this.owner.get('i18n').t('file_browser.successfully_moved'));
            const allFiles = this.get('allFiles');
            if (!allFiles) {
                return;
            }
            allFiles.removeObject(file);
            return true;
        } catch (ex) {
            this.owner.get('toast').error(this.owner.get('i18n').t('move_to_project.could_not_move_file'));
        }

        return false;
    });

    renameFile = task(function *(
        this: IQBRIMSFileBrowser,
        file: File,
        name: string,
        conflict?: string,
        conflictingFile?: File,
    ) {
        const flash = this.get('flash');

        try {
            yield file.rename(name, conflict);

            // intentionally not yielded
            flash.perform(file, 'Successfully renamed');

            if (conflictingFile) {
                yield flash.perform(conflictingFile, this.owner.get('i18n').t('file_browser.file_replaced'), 'danger');
                const allFiles = this.get('allFiles');
                if (!allFiles) {
                    return;
                }
                allFiles.removeObject(conflictingFile);
            }
        } catch (ex) {
            flash.perform(file, 'Failed to rename item', 'danger');
        }
    });

    constructor(owner: GuidNodeIQBRIMS, folderName: string) {
        super();
        this.owner = owner;
        this.folderName = folderName;
    }

    @computed('owner.workingDirectory.files.[]')
    get targetDirectory(): File | undefined {
        if (!this.owner.workingDirectory) {
            return undefined;
        }
        return this.findTargetDirectory(this.owner.workingDirectory);
    }

    findTargetDirectory(defaultStorage: File) {
        if (!defaultStorage.files.isFulfilled && !defaultStorage.files.isRejected) {
            later(() => {
                this.findTargetDirectory(defaultStorage);
            }, 500);
            return undefined;
        }
        const files = defaultStorage.files.filter(f => f.name === this.folderName);
        if (files.length === 0) {
            this.createDirectory(defaultStorage);
            return undefined;
        }
        return files[0];
    }

    createDirectory(defaultStorage: File) {
        if (this.newFolderRequest) {
            return;
        }
        const newFolderUrl = defaultStorage.links.new_folder;
        this.newFolderRequest = this.owner.currentUser.authenticatedAJAX({
            url: `${newFolderUrl}&name=${encodeURIComponent(this.folderName)}`,
            type: 'PUT',
        }).then(() => {
            window.location.reload();
        });
    }

    @computed('targetDirectory.files.[]')
    get allFiles(): File[] | undefined {
        if (!this.targetDirectory) {
            return undefined;
        }
        const dir = this.targetDirectory;
        return dir.files.map(f => f);
    }

    @computed('allFiles.[]', 'filter', 'sort')
    get files(this: IQBRIMSFileBrowser): File[] | null {
        const filter: string = this.get('filter');
        const sort: string = this.get('sort');

        let results = this.get('allFiles');
        if (!results) {
            return null;
        }

        if (filter) {
            const filterLowerCase = filter.toLowerCase();
            results = results.filter(file => file.get('name').toLowerCase().includes(filterLowerCase));
        }

        if (sort) {
            const reverse: boolean = sort.slice(0, 1) === '-';

            results = A(results).sortBy(sort.slice(+reverse));

            if (reverse) {
                results = results.reverse();
            }
        }

        return results;
    }

    @computed('currentUser.currentUserId', 'user.id')
    get canEdit(this: IQBRIMSFileBrowser): boolean {
        return true;
    }

    @action
    async openFile(this: IQBRIMSFileBrowser, file: File, show: string) {
        const guid = file.get('guid') || await file.getGuid();

        this.owner.transitionToRoute('guid-file', guid, { queryParams: { show } });
    }

    buildUrl(files: File[]) {
        const { name } = files[0];
        const dir = this.targetDirectory;
        if (!dir) {
            return;
        }
        return `${dir.links.upload}?${$.param({ name })}`;
    }
}
