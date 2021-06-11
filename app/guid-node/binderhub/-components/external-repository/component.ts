import Component from '@ember/component';
import { action, computed } from '@ember/object';
import { requiredAction } from 'ember-osf-web/decorators/component';

export interface Provider {
    id: string;
    text: string;
}

export interface ProviderLabels {
    repositoryLabel: string;
    refLabel: string;
    repositoryPlaceholder: string;
    refPlaceholder: string;
    refDisabled: boolean;
}

export interface BuildFormValues {
    providerPrefix: string;
    repo: string;
    ref: string;
}

export default class ExternalRepository extends Component {
    providerId: string = 'gh';

    repository: string = '';

    ref: string = '';

    @requiredAction onChange?: (buildFormValues: BuildFormValues) => void;

    @computed('providerId')
    get providerLabels(): ProviderLabels {
        const labels = {
            repositoryLabel: '',
            repositoryPlaceholder: '',
            refLabel: '',
            refPlaceholder: '',
            refDisabled: false,
        };
        const provider = this.providerId;
        let text = '';
        let tagText = 'Git branch, tag, or commit';
        if (provider === 'gh') {
            text = 'GitHub repository name or URL';
        } else if (provider === 'gl') {
            text = 'GitLab.com repository or URL';
        } else if (provider === 'gist') {
            text = 'Gist ID (username/gistId) or URL';
            tagText = 'Git commit SHA';
        } else if (provider === 'git') {
            text = 'Arbitrary git repository URL (http://git.example.com/repo)';
            tagText = 'Git branch, tag, or commit SHA';
        } else if (provider === 'zenodo') {
            text = 'Zenodo DOI (10.5281/zenodo.3242074)';
            labels.refDisabled = true;
        } else if (provider === 'figshare') {
            text = 'Figshare DOI (10.6084/m9.figshare.9782777.v1)';
            labels.refDisabled = true;
        } else if (provider === 'hydroshare') {
            text = 'Hydroshare resource id or URL';
            labels.refDisabled = true;
        } else if (provider === 'dataverse') {
            text = 'Dataverse DOI (10.7910/DVN/TJCLKP)';
            labels.refDisabled = true;
        } else if (provider === 'rdm') {
            text = 'RDM URL';
            labels.refDisabled = true;
        } else if (provider === 'weko3') {
            text = 'WEKO3 URL';
            labels.refDisabled = true;
        }
        labels.repositoryLabel = text;
        labels.repositoryPlaceholder = text;
        labels.refPlaceholder = tagText;
        labels.refLabel = tagText;
        return labels as ProviderLabels;
    }

    @computed('providerId', 'repository', 'ref')
    get buildFormValues(): BuildFormValues {
        const providerPrefix = this.providerId;
        let repo = this.repository;
        if (providerPrefix !== 'git') {
            repo = repo.replace(/^(https?:\/\/)?gist.github.com\//, '');
            repo = repo.replace(/^(https?:\/\/)?github.com\//, '');
            repo = repo.replace(/^(https?:\/\/)?gitlab.com\//, '');
        }
        // trim trailing or leading '/' on repo
        repo = repo.replace(/(^\/)|(\/?$)/g, '');
        // git providers encode the URL of the git repository as the repo
        // argument.
        if (repo.includes('://') || providerPrefix === 'gl') {
            repo = encodeURIComponent(repo);
        }

        let ref = this.ref || 'master';
        if (providerPrefix === 'zenodo' || providerPrefix === 'figshare' || providerPrefix === 'dataverse'
            || providerPrefix === 'hydroshare') {
            ref = '';
        }
        return { providerPrefix, repo, ref } as BuildFormValues;
    }

    get providerList(): Provider[] {
        return [
            { id: 'gh', text: 'GitHub' },
            { id: 'gist', text: 'Gist' },
            { id: 'gl', text: 'GitLab.com' },
            { id: 'git', text: 'Git repository' },
            { id: 'zenodo', text: 'Zenodo DOI' },
            { id: 'figshare', text: 'Figshare DOI' },
            { id: 'hydroshare', text: 'Hydroshare resource' },
            { id: 'dataverse', text: 'Dataverse DOI' },
            { id: 'rdm', text: 'RDM project' },
            { id: 'weko3', text: 'WEKO3' },
        ].map(item => item as Provider);
    }

    @action
    providerChanged(this: ExternalRepository, providerId: string) {
        this.set('providerId', providerId);
        this.notifyChanges();
    }

    @action
    repositoryChanged(this: ExternalRepository, value: string) {
        this.set('repository', value);
        this.notifyChanges();
    }

    @action
    refChanged(this: ExternalRepository, value: string) {
        this.set('ref', value);
        this.notifyChanges();
    }

    notifyChanges() {
        if (!this.onChange) {
            return;
        }
        this.onChange(this.buildFormValues);
    }
}
