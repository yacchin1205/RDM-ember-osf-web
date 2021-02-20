import Component from '@ember/component';
import { action, computed } from '@ember/object';
import { requiredAction } from 'ember-osf-web/decorators/component';
import { BuildMessage } from 'ember-osf-web/guid-node/binderhub/controller';

export default class BuildConsole extends Component {
    buildLog: BuildMessage[] | null = this.buildLog;

    @requiredAction requestBuild!: (callback: (result: BuildMessage) => void) => void;

    @computed('buildLog')
    get buildLogLines(): string {
        if (!this.buildLog) {
            return '';
        }
        return this.buildLog.map(log => log.message).join('');
    }

    @computed('buildLog')
    get buildLogVisible(): boolean {
        if (!this.buildLog) {
            return false;
        }
        return true;
    }

    @action
    launch(this: BuildConsole) {
        if (!this.requestBuild) {
            return;
        }
        this.requestBuild((result: BuildMessage) => {
            console.log('Callback', result);
            if (result.phase !== 'ready') {
                return;
            }
            window.open(result.url, '_blank');
        });
    }
}
