import { indexName } from '../../../index.config';
import {
	NotificationConfig as FeaturePouchdbManagerNotificationConfig,
	SubscriptionConfig as FeaturePouchdbManagerSubscriptionConfig
	} from '@gdgtoulouse/features/pouchdb-manager';
import {
	createAction,
	props,
	union
	} from '@ngrx/store';

export const topic = 'pouchdb-init-sync-lang-child';

export const exec = createAction(
	`[${indexName}][${topic}] exec`,
	props<{
		notificationConfig: FeaturePouchdbManagerNotificationConfig;
		langSubscriptionConfig?: FeaturePouchdbManagerSubscriptionConfig;
		subscriptionConfig?: FeaturePouchdbManagerSubscriptionConfig;
	}>()
);

const all = union({
	exec
});
export type ActionsUnion = typeof all;
