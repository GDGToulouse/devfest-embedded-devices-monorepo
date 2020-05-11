import { featureName } from '../../../feature.config';
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

export const changesChange = createAction(
	`[${featureName}][${topic}] changesChange`,
	props<{
		changesOptionsKey: string;
		change: PouchDB.Core.ChangesResponseChange<{}>;
		databaseConfigurationKey: string;
	}>()
);
export const changesComplete = createAction(
	`[${featureName}][${topic}] changesComplete`,
	props<{
		changesOptionsKey: string;
		completeInfo: PouchDB.Core.ChangesResponse<{}>;
		databaseConfigurationKey: string;
	}>()
);
export const changesError = createAction(
	`[${featureName}][${topic}] changesError`,
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
