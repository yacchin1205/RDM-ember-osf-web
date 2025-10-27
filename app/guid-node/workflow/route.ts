import Controller from '@ember/controller';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

import config from 'ember-get-config';

import GuidNodeWorkflowController, {
    normalizeRegistrations,
    WorkflowRegistration,
} from 'ember-osf-web/guid-node/workflow/controller';
import Node from 'ember-osf-web/models/node';
import { GuidRouteModel } from 'ember-osf-web/resolve-guid/guid-route';
import CurrentUser from 'ember-osf-web/services/current-user';

function buildProjectWorkflowBase(guid: string): string {
    const { OSF } = config;
    const host = OSF.url.replace(/\/$/, '');
    const namespace = OSF.webApiNamespace.replace(/^\//, '').replace(/\/$/, '');
    const base = namespace ? `${host}/${namespace}` : host;
    return `${base}/project/${guid}/workflow/`;
}

function extractErrorMessage(error: unknown): string {
    const response: any = (error as any)?.responseJSON ?? (error as any)?.payload?.responseJSON;
    if (response?.message) {
        return response.message as string;
    }
    if (response?.data?.message) {
        return response.data.message as string;
    }
    const text = (error as any)?.responseText ?? (error as any)?.payload?.responseText;
    if (typeof text === 'string' && text.trim()) {
        return text;
    }
    const message = (error as any)?.message;
    if (typeof message === 'string' && message.trim()) {
        return message;
    }
    return 'Failed to load workflow data.';
}

interface RouteModel {
    node: Node;
    registrations: WorkflowRegistration[];
    apiBaseUrl: string;
    registrationsError?: string | null;
}

export default class GuidNodeWorkflowRoute extends Route {
    @service currentUser!: CurrentUser;

    private hashChangeHandler = () => {
        if (typeof window === 'undefined') {
            return;
        }
        const controller = this.controllerFor('guid-node.workflow') as GuidNodeWorkflowController;
        controller.updateSelectionFromHash(window.location.hash);
    };

    activate(): void {
        if (typeof window === 'undefined') {
            return;
        }
        window.addEventListener('hashchange', this.hashChangeHandler);
    }

    deactivate(): void {
        if (typeof window === 'undefined') {
            return;
        }
        window.removeEventListener('hashchange', this.hashChangeHandler);
    }

    async model(): Promise<RouteModel> {
        const nodeModel = this.modelFor('guid-node') as GuidRouteModel<Node>;
        const { taskInstance } = nodeModel;
        const node = await taskInstance;
        const guid = node.id;
        const apiBaseUrl = buildProjectWorkflowBase(guid);

        let registrations: WorkflowRegistration[] = [];
        let registrationsError: string | null = null;

        try {
            const response = await this.currentUser.authenticatedAJAX({
                url: `${apiBaseUrl}activations/`,
                type: 'GET',
            });
            const data = (response && (response as any).data) || [];
            registrations = normalizeRegistrations(data);
        } catch (error) {
            registrationsError = extractErrorMessage(error);
        }

        return {
            node,
            registrations,
            apiBaseUrl,
            registrationsError,
        };
    }

    setupController(controller: Controller, model: RouteModel): void {
        super.setupController(controller, model);
        const workflowController = controller as GuidNodeWorkflowController;
        workflowController.initialize(
            {
                node: model.node,
                registrations: model.registrations,
                apiBaseUrl: model.apiBaseUrl,
                registrationsError: model.registrationsError,
            },
            typeof window !== 'undefined' ? window.location.hash : '',
        );
    }
}
