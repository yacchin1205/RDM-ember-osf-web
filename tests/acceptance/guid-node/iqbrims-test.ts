import { currentRouteName } from '@ember/test-helpers';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { percySnapshot } from 'ember-percy';
import { module, test } from 'qunit';

import { currentURL, setupOSFApplicationTest, visit } from 'ember-osf-web/tests/helpers';

module('Acceptance | guid-node/iqbrims', hooks => {
    setupOSFApplicationTest(hooks);
    setupMirage(hooks);

    test('logged in, admin', async assert => {
        const node = server.create('node', { id: 'i9bri' });
        server.create('iqbrims-status', { id: node.id, isAdmin: true });
        const url = `/${node.id}/iqbrims`;

        await visit(url);
        assert.equal(currentURL(), url, `We are on ${url}`);
        assert.equal(currentRouteName(), 'guid-node.iqbrims', 'We are at guid-node.iqbrims');
        await percySnapshot(assert);
        assert.dom('[data-test-task-url]').exists();
        assert.dom('[data-test-paper-title]').doesNotExist();
        assert.dom('[data-test-start-deposit]').doesNotExist();
        assert.dom('[data-test-start-check]').doesNotExist();
    });

    test('logged in, not submitted', async assert => {
        const node = server.create('node', { id: 'i9bri' });
        server.create('iqbrims-status', {
            id: node.id,
            isAdmin: false,
            state: 'initialized',
        });
        const url = `/${node.id}/iqbrims`;

        await visit(url);
        assert.equal(currentURL(), url, `We are on ${url}`);
        assert.equal(currentRouteName(), 'guid-node.iqbrims', 'We are at guid-node.iqbrims');
        await percySnapshot(assert);
        assert.dom('[data-test-task-url]').doesNotExist();
        assert.dom('[data-test-paper-title]').doesNotExist();
        assert.dom('[data-test-start-deposit]').exists();
        assert.dom('[data-test-start-check]').exists();
    });

    test('logged in, deposit started', async assert => {
        const node = server.create('node', { id: 'i9bri' });
        server.create('iqbrims-status', {
            id: node.id,
            isAdmin: false,
            state: 'initialized',
            edit: 'deposit',
        });
        const url = `/${node.id}/iqbrims`;

        await visit(url);
        assert.equal(currentURL(), url, `We are on ${url}`);
        assert.equal(currentRouteName(), 'guid-node.iqbrims', 'We are at guid-node.iqbrims');
        await percySnapshot(assert);
        assert.dom('[data-test-task-url]').doesNotExist();
        assert.dom('[data-test-paper-title]').exists();
        assert.dom('[data-test-labo-name]').exists();
        assert.dom('[data-test-labo-selection]').exists();
        assert.dom('[data-test-journal-name]').exists();
        assert.dom('[data-test-submit-button]').exists();
        assert.dom('[data-test-start-deposit]').doesNotExist();
        assert.dom('[data-test-start-check]').doesNotExist();
    });

    test('logged in, check started', async assert => {
        const node = server.create('node', { id: 'i9bri' });
        server.create('iqbrims-status', {
            id: node.id,
            isAdmin: false,
            state: 'initialized',
            edit: 'check',
        });
        const url = `/${node.id}/iqbrims`;

        await visit(url);
        assert.equal(currentURL(), url, `We are on ${url}`);
        assert.equal(currentRouteName(), 'guid-node.iqbrims', 'We are at guid-node.iqbrims');
        await percySnapshot(assert);
        assert.dom('[data-test-task-url]').doesNotExist();
        assert.dom('[data-test-paper-title]').exists();
        assert.dom('[data-test-labo-name]').exists();
        assert.dom('[data-test-labo-selection]').exists();
        assert.dom('[data-test-journal-name]').doesNotExist();
        assert.dom('[data-test-submit-button]').exists();
        assert.dom('[data-test-start-deposit]').doesNotExist();
        assert.dom('[data-test-start-check]').doesNotExist();
    });

    test('logged in, deposit submitted', async assert => {
        const node = server.create('node', { id: 'i9bri' });
        server.create('iqbrims-status', {
            id: node.id,
            isAdmin: false,
            state: 'deposit',
        });
        const url = `/${node.id}/iqbrims`;

        await visit(url);
        assert.equal(currentURL(), url, `We are on ${url}`);
        assert.equal(currentRouteName(), 'guid-node.iqbrims', 'We are at guid-node.iqbrims');
        await percySnapshot(assert);
        assert.dom('[data-test-task-url]').doesNotExist();
        assert.dom('[data-test-paper-title]').exists();
        assert.dom('[data-test-labo-name]').exists();
        assert.dom('[data-test-labo-selection]').doesNotExist();
        assert.dom('[data-test-journal-name]').exists();
        assert.dom('[data-test-submit-button]').doesNotExist();
        assert.dom('[data-test-start-deposit]').doesNotExist();
        assert.dom('[data-test-start-check]').doesNotExist();
    });

    test('logged in, check submitted', async assert => {
        const node = server.create('node', { id: 'i9bri' });
        server.create('iqbrims-status', {
            id: node.id,
            isAdmin: false,
            state: 'check',
        });
        const url = `/${node.id}/iqbrims`;

        await visit(url);
        assert.equal(currentURL(), url, `We are on ${url}`);
        assert.equal(currentRouteName(), 'guid-node.iqbrims', 'We are at guid-node.iqbrims');
        await percySnapshot(assert);
        assert.dom('[data-test-task-url]').doesNotExist();
        assert.dom('[data-test-paper-title]').exists();
        assert.dom('[data-test-labo-name]').exists();
        assert.dom('[data-test-labo-selection]').doesNotExist();
        assert.dom('[data-test-journal-name]').doesNotExist();
        assert.dom('[data-test-journal-input]').doesNotExist();
        assert.dom('[data-test-submit-button]').doesNotExist();
        assert.dom('[data-test-start-deposit]').doesNotExist();
        assert.dom('[data-test-start-check]').doesNotExist();
    });
});
