import { A } from '@ember/array';
import Service from '@ember/service';
import {
    fillIn,
    render,
    triggerEvent,
} from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupRenderingTest } from 'ember-qunit';
import { TestContext } from 'ember-test-helpers';
import { module, test } from 'qunit';
import sinon from 'sinon';

const currentUserStub = Service.extend({
    user: Object.freeze({
        institutions: A([]),
    }),
});

module('Integration | Component | new-project-modal', hooks => {
    setupRenderingTest(hooks);

    hooks.beforeEach(function(this: TestContext) {
        this.owner.register(
            'service:current-user',
            currentUserStub,
        );
    });

    test('it renders', async assert => {
        await render(hbs`
            <NewProjectModal />
        `);

        assert.dom('.modal').exists();
        assert.dom('.modal-title')
            .hasText('Create new project');
    });

    test('create button is disabled initially', async assert => {
        await render(hbs`
            <NewProjectModal />
        `);

        assert.dom(
            '[data-test-create-project-submit]',
        ).isDisabled();
    });

    test('create button is enabled after input', async assert => {
        await render(hbs`
            <NewProjectModal />
        `);

        await fillIn(
            '[data-test-new-project-title]',
            'Hello World',
        );

        assert.dom(
            '[data-test-create-project-submit]',
        ).isEnabled();
    });

    test('Enter triggers create when not composing', function(this: TestContext, assert) {
        const component = this.owner.factoryFor(
            'component:new-project-modal',
        )!.create() as any;

        let prevented = false;

        component.handleKeydown({
            key: 'Enter',
            isComposing: false,
            keyCode: 13,
            preventDefault() {
                prevented = true;
            },
        });

        assert.ok(prevented);
    });

    test('IME Enter does not trigger create', async function(this: TestContext, assert) {
        await render(hbs`
            <NewProjectModal />
        `);

        const component = this.owner.lookup(
            'component:new-project-modal',
        );

        const createStub = sinon.stub(
            component,
            'create',
        );

        const input = document.querySelector(
            '[data-test-new-project-title]',
        ) as HTMLInputElement;

        await fillIn(
            '[data-test-new-project-title]',
            'プロジェクト',
        );

        await triggerEvent(input, 'keydown', {
            key: 'Enter',
            isComposing: true,
            keyCode: 229,
        });

        assert.ok(createStub.notCalled);
    });
});
