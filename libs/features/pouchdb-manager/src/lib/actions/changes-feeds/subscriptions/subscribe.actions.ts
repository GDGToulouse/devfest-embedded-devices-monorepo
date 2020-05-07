import { featureName } from '../../../feature.config';
import {
	createAction,
	props,
	union
	} from '@ngrx/store';

export const topic = 'envs-changes-feeds-subscriptions';

export const exec = createAction(
	`[${featureName}][${topic}] exec`,
	props<{
		changesOptions: PouchDB.Core.ChangesOptions | string;
		databaseConfiguration: PouchDB.Configuration.DatabaseConfiguration | string;
		subscriber: string;
	}>()
);
export const sync = createAction(
	`[${featureName}][${topic}] sync`,
	props<{
		changesOptions: PouchDB.Core.ChangesOptions | string;
		databaseConfiguration: PouchDB.Configuration.DatabaseConfiguration | string;
		subscriber: string;
	}>()
);

const all = union({
	exec,
	sync
});
export type ActionsUnion = typeof all;
