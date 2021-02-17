import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import Intl from 'ember-intl/services/intl';

import checkAuth from 'ember-osf-web/decorators/check-auth';
import CurrentUser from 'ember-osf-web/services/current-user';

@checkAuth
export default class ApplicationRoute extends Route.extend(
    /*
     * If this doesn't use `.extend()`, then `ApplicationRoute.reopen(...)`
     * will open the `Route` prototype and affect all routes.
     *
     * Prevent `session.restore()` from being called several times on every
     * transition by this injected `beforeModel`:
     * https://github.com/simplabs/ember-simple-auth/blob/1.6.0/addon/initializers/setup-session-restoration.js#L8
     */
) {
    @service intl!: Intl;
    @service currentUser!: CurrentUser;

    queryParams = {
        viewOnlyToken: {
            refreshModel: false,
        },
    };

    beforeModel() {
        return this.intl.setLocale(this.getBrowserLocale());
    }

    getBrowserLocale() {
        const defaultLocale = 'en-us';
        const browserLanguage = (window.navigator.languages && window.navigator.languages[0])
            || window.navigator.language;
        const localeMatched = this.intl.locales
            .filter(locale => locale.toLowerCase() === browserLanguage.toLowerCase());
        const langMatched = this.intl.locales
            .filter(locale => locale.split('-')[0].toLowerCase() === browserLanguage.split('-')[0].toLowerCase());
        if (localeMatched.length > 0) {
            return localeMatched[0];
        }
        if (langMatched.length > 0) {
            return langMatched[0];
        }
        return defaultLocale;
    }
}
