import Component from '@ember/component';
import { action } from '@ember/object';
import { requiredAction } from 'ember-osf-web/decorators/component';

export default class PackageItemEditor extends Component {
    name: string = '';

    version: string = '';

    @requiredAction onConfirm!: (name: string, version: string) => void;

    @requiredAction onCancel!: () => void;

    @action
    confirm(this: PackageItemEditor) {
        if (!this.onConfirm) {
            return;
        }
        this.onConfirm(this.get('name'), this.get('version'));
    }

    @action
    cancel(this: PackageItemEditor) {
        if (!this.onCancel) {
            return;
        }
        this.onCancel();
    }
}
