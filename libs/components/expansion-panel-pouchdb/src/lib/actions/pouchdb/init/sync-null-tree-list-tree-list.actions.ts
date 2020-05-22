import { indexName } from '../../../index.config';
import { NotificationConfig } from '@gdgtoulouse/features/pouchdb-manager';
import {
	createAction,
	props,
	union
	} from '@ngrx/store';

export const topic = 'pouchdb-init-sync-null-tree-list-tree-list';

export const exec = createAction(
	`[${indexName}][${topic}] exec`,
	props<{
		notificationConfig: NotificationConfig;
	}>()
);

const all = union({
	exec
});
export type ActionsUnion = typeof all;
