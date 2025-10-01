import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { WorkflowTaskField, WorkflowTaskFieldOption, FieldValueWithType } from '../types';
import { WorkflowVariable } from '../../../types';
import { resolveFlowableType } from '../component';

function getOptionValue(option: WorkflowTaskFieldOption): string | undefined {
    return option.id ?? option.name;
}

function isValidFieldValue(field: WorkflowTaskField, value: unknown): boolean {
    if (value === null || value === undefined) {
        return false;
    }
    if (typeof value === 'string' && value.trim() === '') {
        return false;
    }
    const type = field.type.toLowerCase();
    if (['dropdown', 'select', 'radio-buttons', 'radio'].includes(type)) {
        const options = field.options || [];
        const validValues = options.map(getOptionValue).filter(v => v !== undefined && v !== null && v !== '');
        if (validValues.length > 0 && !validValues.includes(String(value))) {
            return false;
        }
    }
    return true;
}

export { isValidFieldValue, getOptionValue };

interface TaskFormFieldArgs {
    field: WorkflowTaskField;
    fieldValues: Record<string, unknown>;
    variables: WorkflowVariable[];
    node?: any;
    onChange: (fieldId: string, valueWithType: FieldValueWithType) => void;
}

export default class TaskFormField extends Component<TaskFormFieldArgs> {
    @tracked updatedValue: FieldValueWithType | null = null;

    @action
    handleChange(event: Event): void {
        const target = event.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
        let value: unknown;

        if (this.isBoolean) {
            const input = target as HTMLInputElement;
            value = input.checked;
        } else if (this.type === 'integer' || this.type === 'long') {
            const stringValue = target.value;
            if (stringValue === '') {
                value = null;
            } else {
                const parsed = parseInt(stringValue, 10);
                value = Number.isNaN(parsed) ? null : parsed;
            }
        } else if (this.isNumber) {
            const stringValue = target.value;
            if (stringValue === '') {
                value = null;
            } else {
                const parsed = parseFloat(stringValue);
                value = Number.isNaN(parsed) ? null : parsed;
            }
        } else {
            // string, date, etc.
            const stringValue = target.value;
            value = stringValue === '' ? null : stringValue;
        }

        const valueWithType: FieldValueWithType = {
            value: value ?? null,
            type: resolveFlowableType(this.args.field.type),
        };
        this.updatedValue = valueWithType;
        this.args.onChange(this.args.field.id, valueWithType);
    }

    @action
    handleProjectMetadataSelection(valueWithType: FieldValueWithType): void {
        this.updatedValue = valueWithType;
        this.args.onChange(this.args.field.id, valueWithType);
    }

    @action
    handleFileMetadataSelection(valueWithType: FieldValueWithType): void {
        this.updatedValue = valueWithType;
        this.args.onChange(this.args.field.id, valueWithType);
    }

    get displayValue(): unknown {
        return this.updatedValue !== null ? this.updatedValue.value : this.currentValue;
    }

    get hasError(): boolean {
        if (!this.isRequired) {
            return false;
        }
        const val = this.displayValue;
        const isValid = isValidFieldValue(this.args.field, val);
        return !isValid;
    }
    get type(): string {
        return this.args.field.type;
    }

    get fieldId(): string {
        return `workflow-field-${this.args.field.id}`;
    }

    get isRequired(): boolean {
        return this.args.field.required === true;
    }

    get isReadOnly(): boolean {
        return this.args.field.readOnly === true;
    }

    get placeholder(): string | undefined {
        return this.args.field.placeholder;
    }

    get fieldLabel(): string {
        return this.args.field.name || this.args.field.id;
    }

    get currentValue(): unknown {
        return this.args.fieldValues[this.args.field.id];
    }

    get stringValue(): string {
        const val = this.currentValue;
        if (val === null || val === undefined) {
            return '';
        }
        return String(val);
    }

    get booleanValue(): boolean {
        const val = this.currentValue;
        if (typeof val === 'boolean') {
            return val;
        }
        if (typeof val === 'string') {
            return val.toLowerCase() === 'true';
        }
        return Boolean(val);
    }

    get options(): WorkflowTaskFieldOption[] {
        return this.args.field.options || [];
    }

    get optionsWithValue(): Array<{ option: WorkflowTaskFieldOption; value: string }> {
        return this.options.map(opt => ({
            option: opt,
            value: getOptionValue(opt) || '',
        }));
    }

    get hasOptions(): boolean {
        return this.options.length > 0;
    }

    get isTextField(): boolean {
        return this.type === 'text' || this.type === 'string';
    }

    get isTextarea(): boolean {
        if (this.isProjectMetadataSelector) {
            return false;
        }
        return this.type === 'multi-line-text' || this.type === 'textarea';
    }

    get isProjectMetadataSelector(): boolean {
        if (this.type !== 'multi-line-text') {
            return false;
        }
        const placeholder = this.placeholder;
        if (!placeholder) {
            return false;
        }
        return placeholder.startsWith('_PROJECT_METADATA(') && placeholder.endsWith(')');
    }

    get projectMetadataSchemaName(): string | null {
        if (!this.isProjectMetadataSelector) {
            return null;
        }
        const placeholder = this.placeholder || '';
        const match = placeholder.match(/^_PROJECT_METADATA\((.+)\)$/);
        return match ? match[1] : null;
    }

    get isFileMetadataSelector(): boolean {
        if (this.type !== 'multi-line-text') {
            return false;
        }
        const placeholder = this.placeholder;
        if (!placeholder) {
            return false;
        }
        return placeholder.startsWith('_FILE_METADATA(') && placeholder.endsWith(')');
    }

    get fileMetadataSchemaName(): string | null {
        if (!this.isFileMetadataSelector) {
            return null;
        }
        const placeholder = this.placeholder || '';
        const match = placeholder.match(/^_FILE_METADATA\((.+)\)$/);
        return match ? match[1] : null;
    }

    get isPassword(): boolean {
        return this.type === 'password';
    }

    get isNumber(): boolean {
        return ['number', 'integer', 'decimal', 'double', 'long'].includes(this.type);
    }

    get isBoolean(): boolean {
        return this.type === 'boolean' || this.type === 'checkbox';
    }

    get isDate(): boolean {
        return this.type === 'date';
    }

    get isSelect(): boolean {
        return this.type === 'select' || this.type === 'dropdown';
    }

    get isRadio(): boolean {
        return this.type === 'radio-buttons' || this.type === 'radio';
    }

    get isUpload(): boolean {
        return this.type === 'upload' || this.type === 'file';
    }

    get isExpression(): boolean {
        return this.type === 'expression';
    }

    get isHyperlink(): boolean {
        return this.type === 'hyperlink' || this.type === 'link';
    }

    get isHeadline(): boolean {
        return this.type === 'headline' || this.type === 'headline-with-line';
    }

    get isSpacer(): boolean {
        return this.type === 'spacer';
    }

    get isHorizontalLine(): boolean {
        return this.type === 'horizontal-line';
    }

    get isDisplayOnly(): boolean {
        return this.isExpression || this.isHyperlink || this.isHeadline || this.isSpacer || this.isHorizontalLine;
    }

    get expressionText(): string {
        const field = this.args.field as unknown as { expression?: string };
        const expression = field.expression || '';

        return expression.replace(/\$\{([^}]+)\}/g, (_match, varName) => {
            const trimmed = varName.trim();
            const fieldValue = this.args.fieldValues[trimmed];
            if (fieldValue !== null && fieldValue !== undefined) {
                return String(fieldValue);
            }
            const variable = this.args.variables.find(v => v.name === trimmed);
            if (variable && variable.value !== null && variable.value !== undefined) {
                return String(variable.value);
            }
            return '';
        });
    }

    get hyperlinkUrl(): string {
        const field = this.args.field as unknown as { params?: { hyperlinkUrl?: string } };
        return field.params?.hyperlinkUrl || '#';
    }
}
