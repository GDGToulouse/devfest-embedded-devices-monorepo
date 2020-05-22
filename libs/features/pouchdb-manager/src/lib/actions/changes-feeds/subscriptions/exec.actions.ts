import { indexName } from '../../../index.config';
import { SubscriptionConfig as PouchdbManagerSubscriptionConfig } from '@gdgtoulouse/features/pouchdb-manager';
import {
	createAction,
	props,
	union
	} from '@ngrx/store';

export const topic = 'changes-feeds-subscriptions-exec';

//TODO move type elsewhere better
export interface IndexedKeys {
	changesOptionsKey: string;
	databaseConfigurationKey: string;
}

export type Success = IndexedKeys & {
	destinationList: string[];
};

export const subscribe = createAction(`[${indexName}][${topic}] subscribe`, props<{ subscriptionConfig: PouchdbManagerSubscriptionConfig }>());
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
	subscribe,
	databaseConfigurationKeyDoesNotExistYet,
	changesOptionsKeyDoesNotExistYet,
	failure,
	success,
	changesChange,
	changesComplete,
	changesError
});
export type ActionsUnion = typeof all;
