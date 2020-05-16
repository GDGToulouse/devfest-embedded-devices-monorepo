import { indexName } from '../../../index.config';
import { PouchdbCompleteChangesRequest } from '@gdgtoulouse/types';
import {
	createAction,
	props,
	union
	} from '@ngrx/store';

export const topic = 'changes-feeds-subscriptions-sync';

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

export const since0ChangesChange = createAction(
	`[${indexName}][${topic}] since0ChangesChange`,
	props<{
		changesOptionsKey: string;
		change: PouchDB.Core.ChangesResponseChange<{}>;
		databaseConfigurationKey: string;
	}>()
);
export const since0ChangesComplete = createAction(
	`[${indexName}][${topic}] since0ChangesComplete`,
	props<{
		changesOptionsKey: string;
		completeInfo: PouchDB.Core.ChangesResponse<{}>;
		databaseConfigurationKey: string;
	}>()
);
export const since0ChangesError = createAction(
	`[${indexName}][${topic}] since0ChangesError`,
	props<{
		changesOptionsKey: string;
		error: any;
		databaseConfigurationKey: string;
	}>()
);

export const liveSinceLastSeqChangesChange = createAction(
	`[${indexName}][${topic}] liveSinceLastSeqChangesChange`,
	props<{
		changesOptionsKey: string;
		change: PouchDB.Core.ChangesResponseChange<{}>;
		databaseConfigurationKey: string;
	}>()
);
export const liveSinceLastSeqChangesComplete = createAction(
	`[${indexName}][${topic}] liveSinceLastSeqChangesComplete`,
	props<{
		changesOptionsKey: string;
		completeInfo: PouchDB.Core.ChangesResponse<{}>;
		databaseConfigurationKey: string;
	}>()
);
export const liveSinceLastSeqChangesError = createAction(
	`[${indexName}][${topic}] liveSinceLastSeqChangesError`,
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
	since0ChangesChange,
	since0ChangesComplete,
	since0ChangesError,
	liveSinceLastSeqChangesChange,
	liveSinceLastSeqChangesComplete,
	liveSinceLastSeqChangesError
});
export type ActionsUnion = typeof all;
