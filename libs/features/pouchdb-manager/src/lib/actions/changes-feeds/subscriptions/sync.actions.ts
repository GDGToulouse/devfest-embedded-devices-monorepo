import { IndexedKeys } from './exec.actions';
import { indexName } from '../../../index.config';
import { SubscriptionConfig as FeaturePouchdbManagerSubscriptionConfig } from '@gdgtoulouse/features/pouchdb-manager';
import {
	createAction,
	props,
	union
	} from '@ngrx/store';

export const topic = 'changes-feeds-subscriptions-sync';

export type Success = IndexedKeys & {
	destinationList: string[];
};
export const subscribe = createAction(`[${indexName}][${topic}] subscribe`, props<{ subscriptionConfig: FeaturePouchdbManagerSubscriptionConfig }>());
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
	subscribe,
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
