import { featureName } from '../../../feature.config';
import {
	createAction,
	props,
	union
	} from '@ngrx/store';

export const topic = 'envs-changes-feeds-subscriptions-exec';

export const subscribe = createAction(
	`[${featureName}][${topic}] subscribe`,
	props<{
		changesOptions: PouchDB.Core.ChangesOptions | string;
		databaseConfiguration: PouchDB.Configuration.DatabaseConfiguration | string;
		subscriber: string;
	}>()
);
export const change = createAction(
	`[${featureName}][${topic}] change`,
	props<{
		change: PouchDB.Core.ChangesResponseChange<{}>;
		changesOptionsKey: string;
		databaseConfigurationKey: string;
		subscriber: string;
	}>()
);
export const complete = createAction(
	`[${featureName}][${topic}] complete`,
	props<{
		changesOptionsKey: string;
		completeInfo: PouchDB.Core.ChangesResponse<{}>;
		databaseConfigurationKey: string;
		subscriber: string;
	}>()
);

const all = union({
	subscribe
});
export type ActionsUnion = typeof all;
