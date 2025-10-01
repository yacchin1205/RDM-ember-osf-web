import { WorkflowTaskField } from './types';

export interface ProjectMetadataPlaceholder {
    schemaName: string;
}

export interface FileMetadataPlaceholder {
    schemaName: string;
}

export function extractProjectMetadata(field: WorkflowTaskField): ProjectMetadataPlaceholder | null {
    if (field.type !== 'multi-line-text') {
        return null;
    }
    const placeholder = field.placeholder;
    if (!placeholder) {
        return null;
    }
    const match = placeholder.match(/^_PROJECT_METADATA\((.+)\)$/);
    return match ? { schemaName: match[1] } : null;
}

export function extractFileMetadata(field: WorkflowTaskField): FileMetadataPlaceholder | null {
    if (field.type !== 'multi-line-text') {
        return null;
    }
    const placeholder = field.placeholder;
    if (!placeholder) {
        return null;
    }
    const match = placeholder.match(/^_FILE_METADATA\((.+)\)$/);
    return match ? { schemaName: match[1] } : null;
}
