import { SchemaBlockGroup } from 'ember-osf-web/packages/registration-schema';

export interface UiGroupDef {
    id: string;
    title?: string;
    bar?: boolean;
    tags?: string[];
    help?: string;
    info?: string;
    parent?: string;
}

export interface VisualItem {
    schemaBlockGroup?: SchemaBlockGroup;
    uiGroup?: UiGroupDef & { localizedTitle?: string };
    children?: VisualItem[];
}

export function buildVisualItems(
    groups: SchemaBlockGroup[],
    localizeText: (text: string) => string,
): VisualItem[] {
    const root: VisualItem[] = [];
    const groupDefs: { [id: string]: UiGroupDef } = {};
    const groupItems: { [id: string]: VisualItem } = {};

    function ensureGroup(id: string): VisualItem {
        if (groupItems[id]) {
            return groupItems[id];
        }
        const def = groupDefs[id];
        const item: VisualItem = {
            uiGroup: {
                ...def,
                localizedTitle: def.title ? localizeText(def.title) : undefined,
            },
            children: [],
        };
        groupItems[id] = item;
        if (def.parent) {
            ensureGroup(def.parent).children!.push(item);
        } else {
            root.push(item);
        }
        return item;
    }

    for (const group of groups) {
        const inputBlock = group.inputBlock;
        const ui = inputBlock && inputBlock.ui;
        if (!ui || !ui.group) {
            root.push({ schemaBlockGroup: group });
            continue;
        }
        const groupRef = ui.group;
        const groupDef = typeof groupRef === 'object' ? groupRef : null;
        const groupId = groupDef ? groupDef.id : groupRef as string;

        if (groupDef) {
            let parentId: string | undefined;
            if (groupDef.parent) {
                if (typeof groupDef.parent === 'object') {
                    const parentObj = groupDef.parent as UiGroupDef;
                    groupDefs[parentObj.id] = parentObj;
                    parentId = parentObj.id;
                } else {
                    parentId = groupDef.parent as string;
                }
            }
            groupDefs[groupId] = {
                id: groupDef.id,
                title: groupDef.title,
                bar: groupDef.bar,
                tags: groupDef.tags,
                help: groupDef.help,
                info: groupDef.info,
                parent: parentId,
            };
        }

        ensureGroup(groupId).children!.push({ schemaBlockGroup: group });
    }

    return root;
}
