import { indexName } from '../../../index.config';
import { PouchdbCompleteChangesRequest } from '@gdgtoulouse/types';
import {
	createAction,
	props,
	union
	} from '@ngrx/store';

export const topic = 'changes-feeds-subscriptions-exec';

export interface Success {
	changesOptionsKey: string;
	databaseConfigurationKey: string;
	subscriber: string;
}

export const request = createAction(`[${indexName}][${topic}] request`, props<PouchdbCompleteChangesRequest>());
export const databaseConfigurationKeyDoesNotExistYet = createAction(
	`[${indexName}][${topic}] databaseConfigurationKeyDoesNotExistYet`,
	props<{
		databaseConfigurationKey: string;
	}>()
);
export const changesOptionsKeyDoesNotExistYet = createAction(
	`[${indexName}][${topic}] changesOptionsKeyDoesNotExistYet`,
	props<{
		changesOptionsKey: string;
	}>()
);
export const failure = createAction(
	`[${indexName}][${topic}] failure`,
	props<{
		failure: any;
	}>()
);
export const success = createAction(
	`[${indexName}][${topic}] success`,
	props<{
		success: Success;
	}>()
);

export const changesChange = createAction(
	`[${indexName}][${topic}] changesChange`,
	props<{
		changesOptionsKey: string;
		change: PouchDB.Core.ChangesResponseChange<{}>;
		databaseConfigurationKey: string;
	}>()
);
export const changesComplete = createAction(
	`[${indexName}][${topic}] changesComplete`,
	props<{
		changesOptionsKey: string;
		completeInfo: PouchDB.Core.ChangesResponse<{}>;
		databaseConfigurationKey: string;
	}>()
);
export const changesError = createAction(
	`[${indexName}][${topic}] changesError`,
	props<{
		changesOptionsKey: string;
		error: any;
		databaseConfigurationKey: string;
	}>()
);

const all = union({
	request,
	databaseConfigurationKeyDoesNotExistYet,
	changesOptionsKeyDoesNotExistYet,
	failure,
	success,
	changesChange,
	changesComplete,
	changesError
});
export type ActionsUnion = typeof all;
