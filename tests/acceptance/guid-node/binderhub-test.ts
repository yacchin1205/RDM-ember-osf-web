import { currentRouteName } from '@ember/test-helpers';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { percySnapshot } from 'ember-percy';
import { module, test } from 'qunit';

import { currentURL, setupOSFApplicationTest, visit } from 'ember-osf-web/tests/helpers';

module('Acceptance | guid-node/myscreen', hooks => {
    setupOSFApplicationTest(hooks);
    setupMirage(hooks);

    test('logged in', async assert => {
        const node = server.create('node', { id: 'i9bri' });
        server.create('binderhub-config', {
            id: node.id,
            binderhub: { url: '123', authorize_url: 'http://localhost/authorize' },
        });
        const url = `/${node.id}/binderhub`;

        await visit(url);
        assert.equal(currentURL(), url, `We are on ${url}`);
        assert.equal(currentRouteName(), 'guid-node.binderhub', 'We are at guid-node.binderhub');
        await percySnapshot(assert);
        assert.dom('[data-test-binder-url] input').exists()
            .hasValue('123');
        assert.dom('[data-test-save-button]').exists();
    });
});
