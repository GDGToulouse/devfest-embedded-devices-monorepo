import { indexName } from '../../../index.config';
import { Tree } from '../../../models';
import { SubscribeRequest } from '@gdgtoulouse/features/pouchdb-manager';
import { Register } from '@gdgtoulouse/structures/pouchdb-manager';
import {
	createAction,
	props
	} from '@ngrx/store';

export const topic = 'ui-expansion-panel-opened';

export const exec = createAction(
	`[${indexName}][${topic}] exec`,
	props<{
		langSubscribeRequest?: SubscribeRequest;
		subscribeRequest?: SubscribeRequest;
		tree: Tree;
	}>()
);
