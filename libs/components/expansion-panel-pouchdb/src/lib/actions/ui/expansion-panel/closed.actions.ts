import { indexName } from '../../../index.config';
import { Tree } from '@gdgtoulouse/components/expansion-panel';
import { PouchdbCompleteChangesRequest } from '@gdgtoulouse/types';
import {
	createAction,
	props,
	union
	} from '@ngrx/store';

export const topic = 'ui-expansion-panel-closed';

export interface Success {
	changesOptionsKey: string;
	databaseConfigurationKey: string;
	subscriber: string;
}

export const exec = createAction(
	`[${indexName}][${topic}] exec`,
	props<{
		changesRequest?: PouchdbCompleteChangesRequest;
		tree: Tree;
	}>()
);

const all = union({
	exec
});
export type ActionsUnion = typeof all;
