import { computed } from '@ember-decorators/object';
import { alias } from '@ember-decorators/object/computed';
import { service } from '@ember-decorators/service';
import Component from '@ember/component';
import { htmlSafe } from '@ember/string';
import I18N from 'ember-i18n/services/i18n';
import moment from 'moment';

import { layout } from 'ember-osf-web/decorators/component';
import Contributor from 'ember-osf-web/models/contributor';
import Node from 'ember-osf-web/models/node';
import Analytics from 'ember-osf-web/services/analytics';
import styles from './styles';
import template from './template';

@layout(template, styles)
export default class DashboardItem extends Component {
    @service i18n!: I18N;
    @service analytics!: Analytics;

    node?: Node;

    @alias('getAncestorTitles.lastComplete.value') ancestry!: string[];
    @alias('node.bibliographicContributors') contributors!: Contributor[];

    @computed('node.dateModified')
    get date(): string | undefined {
        return this.node ? moment(this.node.dateModified).format('YYYY-MM-DD h:mm A') : undefined;
    }

    @computed('node.quotaThreshold', 'node.quotaRate')
    get quotaNotice() {
        if (this.node) {
            if (this.node.quotaRate > 1) {
                return htmlSafe('<b>Warning</b><div>Surpassed max quota</div>');
            } else if (this.node.quotaRate > this.node.quotaThreshold) {
                const threshold = Math.round(this.node.quotaThreshold * 100);
                return htmlSafe(`<b>Alert</b><div>Used more than ${threshold}%</div>`);
            }
        }
        return htmlSafe('');
    }

    @computed('node.creator')
    get administrator(): string | undefined {
        return this.node ?
            this.node.creator.get('familyName') ||
            this.node.creator.get('givenName') ||
            this.node.creator.get('fullName')
            : undefined;
    }
}
