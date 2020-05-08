import { featureName } from '../../../feature.config';
import {
	createAction,
	props,
	union
	} from '@ngrx/store';

export const topic = 'envs-changes-feeds-subscriptions-sync';

export const subscribe = createAction(
	`[${featureName}][${topic}] subscribe`,
	props<{
		changesOptions: PouchDB.Core.ChangesOptions | string;
		databaseConfiguration: PouchDB.Configuration.DatabaseConfiguration | string;
		subscriber: string;
	}>()
);

const all = union({
	subscribe
});
export type ActionsUnion = typeof all;
