import { featureName } from '../../../feature.config';
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

export const request = createAction(
	`[${featureName}][${topic}] request`,
	props<{
		changesOptions: PouchDB.Core.ChangesOptions | string;
		databaseConfiguration: PouchDB.Configuration.DatabaseConfiguration | string;
		subscriber: string;
	}>()
);
export const databaseConfigurationKeyDoesNotExistYet = createAction(
	`[${featureName}][${topic}] databaseConfigurationKeyDoesNotExistYet`,
	props<{
		databaseConfigurationKey: string;
	}>()
);
export const changesOptionsKeyDoesNotExistYet = createAction(
	`[${featureName}][${topic}] changesOptionsKeyDoesNotExistYet`,
	props<{
		changesOptionsKey: string;
	}>()
);
export const failure = createAction(
	`[${featureName}][${topic}] failure`,
	props<{
		failure: any;
	}>()
);
export const success = createAction(
	`[${featureName}][${topic}] success`,
	props<{
		success: Success;
	}>()
);

export const since0ChangesChange = createAction(
	`[${featureName}][${topic}] since0ChangesChange`,
	props<{
		changesOptionsKey: string;
		change: PouchDB.Core.ChangesResponseChange<{}>;
		databaseConfigurationKey: string;
	}>()
);
export const since0ChangesComplete = createAction(
	`[${featureName}][${topic}] since0ChangesComplete`,
	props<{
		changesOptionsKey: string;
		completeInfo: PouchDB.Core.ChangesResponse<{}>;
		databaseConfigurationKey: string;
	}>()
);
export const since0ChangesError = createAction(
	`[${featureName}][${topic}] since0ChangesError`,
	props<{
		changesOptionsKey: string;
		error: any;
		databaseConfigurationKey: string;
	}>()
);

export const liveSinceLastSeqChangesChange = createAction(
	`[${featureName}][${topic}] liveSinceLastSeqChangesChange`,
	props<{
		changesOptionsKey: string;
		change: PouchDB.Core.ChangesResponseChange<{}>;
		databaseConfigurationKey: string;
	}>()
);
export const liveSinceLastSeqChangesComplete = createAction(
	`[${featureName}][${topic}] liveSinceLastSeqChangesComplete`,
	props<{
		changesOptionsKey: string;
		completeInfo: PouchDB.Core.ChangesResponse<{}>;
		databaseConfigurationKey: string;
	}>()
);
export const liveSinceLastSeqChangesError = createAction(
	`[${featureName}][${topic}] liveSinceLastSeqChangesError`,
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
