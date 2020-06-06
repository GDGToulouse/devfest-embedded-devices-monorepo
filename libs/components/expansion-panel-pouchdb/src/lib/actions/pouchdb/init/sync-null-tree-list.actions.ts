import { indexName } from '../../../index.config';
import { SubscribeRequest } from '@gdgtoulouse/features/pouchdb-manager';
import {
	createAction,
	props
	} from '@ngrx/store';

export const topic = 'pouchdb-init-sync-null-tree-list';

export const exec = createAction(
	`[${indexName}][${topic}] exec`,
	props<{
		langSubscribeRequest?: SubscribeRequest;
		subscribeRequest?: SubscribeRequest;
	}>()
);
