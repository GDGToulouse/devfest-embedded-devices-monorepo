import { indexName } from '../../../index.config';
import {
	Register,
	Since0EmitsChange
	} from '@gdgtoulouse/structures/pouchdb-manager';
import {
	createAction,
	props
	} from '@ngrx/store';

export const topic = 'pouchdb-init-sync-lang-null-tree-list-tree-list';

export const exec = createAction(
	`[${indexName}][${topic}] exec`,
	props<{
		since0EmitsChange: Since0EmitsChange;
		langSubscribeRequest?: Register;
		subscribeRequest?: Register;
	}>()
);
