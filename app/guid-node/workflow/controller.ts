import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import config from 'ember-get-config';

import CurrentUser from 'ember-osf-web/services/current-user';
import Intl from 'ember-intl/services/intl';

import Node from 'ember-osf-web/models/node';
import pathJoin from 'ember-osf-web/utils/path-join';
import {
    WorkflowRegistration,
    WorkflowActivationApiResponse,
    WorkflowRouteModel,
    WorkflowRunSummary,
    WorkflowTaskSummary,
    WorkflowTaskDetail,
    TaskDialogSubmission,
    WorkflowVariable,
} from './types';

export {
    WorkflowRegistration,
    WorkflowRouteModel,
    WorkflowRunSummary,
    WorkflowTaskSummary,
    WorkflowTaskDetail,
    TaskDialogSubmission,
};

function isAjaxError(error: unknown): error is { responseJSON?: { message?: string; data?: { message?: string } }; payload?: unknown } {
    if (!error || typeof error !== 'object') {
        return false;
    }
    const obj = error as Record<string, unknown> | null;
    if (!obj) {
        return false;
    }
    return 'responseJSON' in obj || 'payload' in obj;
}

function ensureTrailingSlash(value: string): string {
    return value.endsWith('/') ? value : `${value}/`;
}

function extractMessage(error: unknown, fallback: string): string {
    const response: any = (error as any)?.responseJSON ?? (error as any)?.payload?.responseJSON;
    if (response?.message) {
        return response.message as string;
    }
    if (response?.data?.message) {
        return response.data.message as string;
    }
    return fallback;
}

export function normalizeRegistrations(activations: WorkflowActivationApiResponse[]): WorkflowRegistration[] {
    return activations.map(entry => {
        const registration = entry.registration;
        const id = registration.id;
        const shortLabel = registration.label || registration.definition_name || registration.definition_key || registration.definition_id || id;
        const displayLabel = !registration.is_local && registration.node_title
            ? `${shortLabel} [${registration.node_title}]`
            : shortLabel;
        return {
            id: String(id),
            label: registration.label ? String(registration.label) : undefined,
            shortLabel,
            displayLabel,
            definitionId: registration.definition_id ? String(registration.definition_id) : undefined,
            definitionKey: registration.definition_key ? String(registration.definition_key) : undefined,
            definitionName: registration.definition_name ? String(registration.definition_name) : undefined,
            description: registration.description ? String(registration.description) : undefined,
            nodeTitle: registration.node_title ? String(registration.node_title) : undefined,
            isLocal: Boolean(registration.is_local),
            isActive: registration.is_active !== false,
            isEnabled: entry.is_enabled !== false,
            definitionFormSchema: registration.definition_form_schema,
        } as WorkflowRegistration;
    });
}

export default class GuidNodeWorkflowController extends Controller {
    @service currentUser!: CurrentUser;
    @service intl!: Intl;

    @tracked registrations: WorkflowRegistration[] = [];
    @tracked registrationsError: string | null = null;
    @tracked isRefreshing = false;

    @tracked selectedRegistrationId = '';
    @tracked startFormVariables: WorkflowVariable[] = [];
    @tracked prefilledStartFormVariables: WorkflowVariable[] = [];
    @tracked isStartFormValid = true;

    @tracked isSubmitting = false;
    @tracked submitError: string | null = null;
    @tracked submitSuccess: string | null = null;

    @tracked runs: WorkflowRunSummary[] = [];
    @tracked runsError: string | null = null;
    @tracked isRefreshingRuns = false;
    @tracked runsLoaded = false;
    @tracked hideCompletedRuns = true;

    @tracked isCancelDialogOpen = false;
    @tracked cancellingRun: WorkflowRunSummary | null = null;
    @tracked isCancellingRun = false;
    @tracked cancelRunError: string | null = null;

    get visibleRuns(): WorkflowRunSummary[] {
        if (!this.hideCompletedRuns) {
            return this.runs;
        }
        return this.runs.filter(run => run.status === 'running');
    }

    get runsWithActions(): Array<WorkflowRunSummary & { projectUrl: string; isCurrentProject: boolean; canCancel: boolean }> {
        if (!this.node) {
            return [];
        }
        const currentNodeId = this.node.id;
        const hasAdminPermission = Boolean(this.node?.userHasAdminPermission);
        const filtered = this.hideCompletedRuns
            ? this.runs.filter(run => run.status === 'running')
            : this.runs;
        return filtered.map(run => {
            const isCompleted = run.status === 'completed' || run.status === 'cancelled' || run.status === 'failed';
            const canCancel = hasAdminPermission && !isCompleted && run.node_id === currentNodeId;
            return {
                ...run,
                projectUrl: pathJoin(config.OSF.url, run.node_id),
                isCurrentProject: run.node_id === currentNodeId,
                canCancel,
            };
        });
    }

    @tracked tasks: WorkflowTaskSummary[] = [];
    @tracked tasksError: string | null = null;
    @tracked isRefreshingTasks = false;
    @tracked tasksLoaded = false;
    @tracked hideCompletedTasks = true;

    get tasksWithActions(): Array<WorkflowTaskSummary & { canComplete: boolean; assigneeDisplay: string; projectUrl: string; isCurrentProject: boolean }> {
        if (!this.node) {
            return [];
        }
        const currentNodeId = this.node.id;
        const filtered = this.hideCompletedTasks
            ? this.tasks.filter(task => task.task_status === 'running')
            : this.tasks;
        return filtered.map(task => ({
            ...task,
            canComplete: task.can_complete !== false,
            assigneeDisplay: this.assigneeLabel(task.assignee),
            projectUrl: pathJoin(config.OSF.url, task.node_id),
            isCurrentProject: task.node_id === currentNodeId,
        }));
    }

    get assignedTaskCount(): number {
        return this.tasksWithActions.filter(task => task.canComplete).length;
    }

    @tracked selectedTask: WorkflowTaskDetail | null = null;
    @tracked isTaskDialogOpen = false;
    @tracked isLoadingTaskDetail = false;
    @tracked taskDetailError: string | null = null;
    @tracked isSubmittingTaskAction = false;
    @tracked taskActionError: string | null = null;
    @tracked taskActionSuccess: string | null = null;

    @tracked activeTab: 'start' | 'runs' | 'tasks' = 'start';

    apiBaseUrl = '';
    node?: Node;

    runStatusLabels: Record<string, string> = {};

    get activeRegistrations(): WorkflowRegistration[] {
        return this.registrations.filter(entry => entry.isActive && entry.isEnabled);
    }

    get canStartWorkflow(): boolean {
        return Boolean(this.node?.userHasWritePermission);
    }

    get selectedRegistration(): WorkflowRegistration | undefined {
        return this.activeRegistrations.find(entry => entry.id === this.selectedRegistrationId);
    }

    get startDisabled(): boolean {
        return !this.canStartWorkflow || !this.selectedRegistrationId || this.isSubmitting || !this.isStartFormValid;
    }

    get nodeTitle(): string {
        return this.node?.title || this.intl.t('workflow.console.heading') as string;
    }

    initialize(model: WorkflowRouteModel, hash: string): void {
        this.node = model.node;
        this.apiBaseUrl = ensureTrailingSlash(model.apiBaseUrl);
        this.registrations = model.registrations;
        this.registrationsError = model.registrationsError || null;

        this.runStatusLabels = {
            queued: this.intl.t('workflow.console.status.queued') as string,
            running: this.intl.t('workflow.console.status.running') as string,
            completed: this.intl.t('workflow.console.status.completed') as string,
            failed: this.intl.t('workflow.console.status.failed') as string,
            cancelled: this.intl.t('workflow.console.status.cancelled') as string,
        };

        const hasStartHash = this.updateSelectionFromHash(hash);
        const taskToOpen = this.extractTaskFromHash(hash);
        this.refreshRuns();
        this.refreshTasks().then(() => {
            if (taskToOpen) {
                this.activeTab = 'tasks';
                const task = this.tasks.find(t => t.id === taskToOpen.taskId && t.engine_id === taskToOpen.engineId);
                if (task) {
                    this.openTask(task);
                }
            } else if (!hasStartHash) {
                const hasAssignedTasks = this.tasksWithActions.some(task => task.canComplete);
                if (hasAssignedTasks) {
                    this.activeTab = 'tasks';
                }
            }
        });
    }

    applyHash(hash?: string): boolean {
        if (!hash) {
            return false;
        }
        const params = new URLSearchParams(hash.replace(/^#/, ''));
        const startValue = params.get('start');
        if (!startValue) {
            return false;
        }
        if (this.activeRegistrations.some(entry => String(entry.id) === startValue)) {
            this.selectedRegistrationId = startValue;

            const variables: WorkflowVariable[] = [];
            params.forEach((value, key) => {
                if (key.startsWith('field_')) {
                    const fieldId = key.substring(6);
                    variables.push({
                        name: fieldId,
                        value,
                        type: 'string',
                    });
                }
            });
            this.prefilledStartFormVariables = variables;

            return true;
        }
        return false;
    }

    updateSelectionFromHash(hash?: string): boolean {
        const candidate = hash ?? window.location.hash;
        return this.applyHash(candidate);
    }

    extractTaskFromHash(hash?: string): { taskId: string; engineId: string } | null {
        const candidate = hash ?? window.location.hash;
        if (!candidate) {
            return null;
        }
        const params = new URLSearchParams(candidate.replace(/^#/, ''));
        const taskId = params.get('taskId');
        const engineId = params.get('engineId');
        if (taskId && engineId) {
            return { taskId, engineId };
        }
        return null;
    }

    formatDate(value?: string | null): string {
        if (!value) {
            return '';
        }
        const parsed = new Date(value);
        if (!Number.isNaN(parsed.getTime())) {
            return parsed.toLocaleString();
        }
        return value;
    }

    @action
    selectRegistration(event: Event): void {
        const target = event.target as HTMLSelectElement | null;
        const value = target?.value ?? '';
        this.selectedRegistrationId = value;
        this.submitError = null;
        this.submitSuccess = null;
        this.startFormVariables = [];
        this.prefilledStartFormVariables = [];
        if (value) {
            window.location.hash = `start=${encodeURIComponent(value)}`;
        } else {
            const { pathname, search } = window.location;
            window.history.replaceState(null, document.title, `${pathname}${search}`);
        }
    }


    runStatusLabel(run: WorkflowRunSummary & { statusRaw?: unknown }): string {
        if (run.status) {
            const localized = this.runStatusLabels[run.status];
            if (localized) {
                return localized;
            }
        }
        if (typeof run.statusRaw === 'string' && run.statusRaw.trim()) {
            return run.statusRaw;
        }
        if (run.status) {
            return run.status;
        }
        return '';
    }

    private assigneeLabel(assignee?: string): string {
        if (!assignee) {
            return this.intl.t('workflow.console.tasks.dialog.unassigned') as string;
        }
        const lower = assignee.toLowerCase();
        if (lower === 'executor') {
            return this.intl.t('workflow.console.tasks.assignee.executor') as string;
        }
        if (lower === 'creator') {
            return this.intl.t('workflow.console.tasks.assignee.creator') as string;
        }
        if (lower === 'manager') {
            return this.intl.t('workflow.console.tasks.assignee.manager') as string;
        }
        if (lower === 'contributor') {
            return this.intl.t('workflow.console.tasks.assignee.contributor') as string;
        }
        return assignee;
    }

    @action
    setActiveTab(tab: 'start' | 'runs' | 'tasks'): void {
        if (this.activeTab === tab) {
            return;
        }
        this.activeTab = tab;
        if (tab === 'runs' && !this.runsLoaded) {
            this.refreshRuns();
        }
        if (tab === 'tasks' && !this.tasksLoaded) {
            this.refreshTasks();
        }
    }

    @action
    toggleHideCompletedRuns(event: Event): void {
        const target = event.target as HTMLInputElement | null;
        this.hideCompletedRuns = Boolean(target?.checked);
    }

    @action
    toggleHideCompletedTasks(event: Event): void {
        const target = event.target as HTMLInputElement | null;
        this.hideCompletedTasks = Boolean(target?.checked);
    }

    @action
    async refreshRuns(): Promise<void> {
        if (!this.apiBaseUrl) {
            return;
        }
        this.isRefreshingRuns = true;
        this.runsError = null;
        try {
            const response = await this.currentUser.authenticatedAJAX({
                url: `${this.apiBaseUrl}runs/`,
                type: 'GET',
                data: { limit: 25 },
            });
            const data = (response && (response as any).data) || [];
            this.runs = data.map((entry: any) => {
                const rawStatus = entry.status;
                const normalizedStatus = typeof rawStatus === 'string' ? rawStatus.toLowerCase() : '';
                return {
                    ...entry,
                    status: normalizedStatus,
                    statusRaw: rawStatus,
                };
            });
            this.runsLoaded = true;
        } catch (error) {
            if (isAjaxError(error)) {
                this.runsError = extractMessage(
                    error,
                    this.intl.t('workflow.console.runs.loadError') as string,
                );
            } else {
                throw error;
            }
        } finally {
            this.isRefreshingRuns = false;
        }
    }

    @action
    openCancelDialog(run: WorkflowRunSummary): void {
        this.cancellingRun = run;
        this.isCancelDialogOpen = true;
        this.cancelRunError = null;
    }

    @action
    closeCancelDialog(): void {
        this.isCancelDialogOpen = false;
        this.cancellingRun = null;
        this.cancelRunError = null;
    }

    @action
    async confirmCancelRun(reason: string): Promise<void> {
        const run = this.cancellingRun;
        if (!this.apiBaseUrl || !run) {
            return;
        }

        const runId = run.id;
        this.isCancellingRun = true;
        this.cancelRunError = null;

        // Mark as cancelling in the list
        this.runs = this.runs.map(r =>
            r.id === runId ? { ...r, isCancelling: true } : r
        );

        try {
            await this.currentUser.authenticatedAJAX({
                url: `${this.apiBaseUrl}runs/${encodeURIComponent(runId)}/`,
                type: 'DELETE',
                data: reason ? { reason } : undefined,
            });

            this.closeCancelDialog();
            await this.refreshRuns();
        } catch (error) {
            this.cancelRunError = extractMessage(
                error,
                this.intl.t('workflow.console.runs.cancelError') as string,
            );

            // Remove cancelling flag on error
            this.runs = this.runs.map(r =>
                r.id === runId ? { ...r, isCancelling: false } : r
            );
        } finally {
            this.isCancellingRun = false;
        }
    }

    @action
    async refreshTasks(): Promise<void> {
        if (!this.apiBaseUrl) {
            return;
        }
        this.isRefreshingTasks = true;
        this.tasksError = null;
        try {
            const response = await this.currentUser.authenticatedAJAX({
                url: `${this.apiBaseUrl}tasks/`,
                type: 'GET',
                data: { limit: 25 },
            });
            this.tasks = (response as any).data;
            this.tasksLoaded = true;
        } catch (error) {
            if (isAjaxError(error)) {
                this.tasksError = extractMessage(
                    error,
                    this.intl.t('workflow.console.tasks.loadError') as string,
                );
            } else {
                throw error;
            }
        } finally {
            this.isRefreshingTasks = false;
        }
    }

    @action
    async openTask(task: WorkflowTaskSummary): Promise<void> {
        this.taskDetailError = null;
        this.selectedTask = null;
        this.isTaskDialogOpen = true;
        this.isLoadingTaskDetail = true;
        this.taskActionError = null;
        this.taskActionSuccess = null;

        try {
            const response = await this.currentUser.authenticatedAJAX({
                url: `${this.apiBaseUrl}engines/${encodeURIComponent(task.engine_id)}/tasks/${encodeURIComponent(task.id)}/`,
                type: 'GET',
                data: { include_form: 'true' },
            });
            const data = (response && (response as any).data) || null;
            if (!data) {
                throw new Error('Task payload not found.');
            }
            this.selectedTask = data;
        } catch (error) {
            if (isAjaxError(error)) {
                this.taskDetailError = extractMessage(
                    error,
                    this.intl.t('workflow.console.tasks.detailLoadError') as string,
                );
            } else {
                this.taskDetailError = (error as Error)?.message || String(error);
            }
        } finally {
            this.isLoadingTaskDetail = false;
        }
    }

    @action
    closeTaskDialog(): void {
        this.isTaskDialogOpen = false;
        this.selectedTask = null;
        this.taskDetailError = null;
        this.taskActionError = null;
        this.isLoadingTaskDetail = false;
        this.isSubmittingTaskAction = false;
    }

    @action
    async handleTaskSubmit(submission: TaskDialogSubmission): Promise<void> {
        if (!this.selectedTask) {
            throw new Error('No task selected');
        }

        const processInstanceId = this.selectedTask.process_instance_id;

        this.isSubmittingTaskAction = true;
        this.taskActionError = null;
        try {
            await this.currentUser.authenticatedAJAX({
                url: `${this.apiBaseUrl}engines/${encodeURIComponent(this.selectedTask.engine_id)}/tasks/${encodeURIComponent(this.selectedTask.id)}/actions/`,
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({
                    action: submission.action,
                    variables: submission.variables,
                    ...(submission.assignee ? { assignee: submission.assignee } : {}),
                }),
            });
            this.taskActionSuccess = this.intl.t('workflow.console.tasks.submitSuccess') as string;
            await this.refreshTasks();

            const nextTask = this.tasksWithActions.find(task =>
                task.process_instance_id === processInstanceId && task.canComplete
            );

            if (nextTask) {
                this.openTask(nextTask);
            } else {
                this.closeTaskDialog();
            }
        } catch (error) {
            if (isAjaxError(error)) {
                this.taskActionError = extractMessage(
                    error,
                    this.intl.t('workflow.console.tasks.submitFailed') as string,
                );
            } else {
                this.taskActionError = (error as Error)?.message || String(error);
            }
        } finally {
            this.isSubmittingTaskAction = false;
        }
    }

    @action
    async refreshRegistrations(): Promise<void> {
        if (!this.apiBaseUrl) {
            return;
        }
        this.isRefreshing = true;
        this.registrationsError = null;
        try {
            const response: { data: WorkflowActivationApiResponse[] } = await this.currentUser.authenticatedAJAX({
                url: `${this.apiBaseUrl}activations/`,
                type: 'GET',
            });
            this.registrations = normalizeRegistrations(response.data);
            if (this.selectedRegistrationId && !this.activeRegistrations.some(entry => entry.id === this.selectedRegistrationId)) {
                this.selectedRegistrationId = '';
            }
            this.updateSelectionFromHash();
        } catch (error) {
            if (isAjaxError(error)) {
                this.registrationsError = extractMessage(
                    error,
                    this.intl.t('workflow.console.loadError') as string,
                );
            } else {
                throw error;
            }
        } finally {
            this.isRefreshing = false;
        }
    }

    @action
    handleStartFormChange(variables: WorkflowVariable[], isValid: boolean): void {
        this.startFormVariables = variables;
        this.isStartFormValid = isValid;
    }

    @action
    async handleStartFormSubmit(): Promise<void> {
        if (!this.canStartWorkflow || !this.selectedRegistrationId || !this.apiBaseUrl) {
            return;
        }

        const payload: Record<string, unknown> = {};

        if (this.startFormVariables.length > 0) {
            payload.variables = this.startFormVariables;
        }

        this.isSubmitting = true;
        this.submitError = null;
        this.submitSuccess = null;

        try {
            await this.currentUser.authenticatedAJAX({
                url: `${this.apiBaseUrl}registrations/${encodeURIComponent(this.selectedRegistrationId)}/runs/`,
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(payload),
            });
            this.submitSuccess = this.intl.t('workflow.console.startSuccess') as string;
            this.startFormVariables = [];
            await this.refreshTasks();
            const hasAssignedTasks = this.tasksWithActions.some(task => task.canComplete);
            if (hasAssignedTasks) {
                this.activeTab = 'tasks';
            }
        } catch (error) {
            const fallback = this.intl.t('workflow.console.startFailed') as string;
            if (isAjaxError(error)) {
                this.submitError = extractMessage(error, fallback);
            } else {
                throw error;
            }
        } finally {
            this.isSubmitting = false;
        }
    }

}

declare module '@ember/controller' {
    interface Registry {
        'guid-node.workflow': GuidNodeWorkflowController;
    }
}
