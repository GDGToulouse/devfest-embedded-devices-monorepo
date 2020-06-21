import { indexName } from '../../../index.config';
import { Tree } from '../../../models';
import { SubscribeRequest } from '@gdgtoulouse/features/pouchdb-manager';
import {
	createAction,
	props
	} from '@ngrx/store';
export const topic = 'ui-menu-destroyed';

export const exec = createAction(
	`[${indexName}][${topic}] exec`,
	props<{
		langSubscribeRequest?: SubscribeRequest;
		subscribeRequest?: SubscribeRequest;
		tree: Tree;
	}>()
);
