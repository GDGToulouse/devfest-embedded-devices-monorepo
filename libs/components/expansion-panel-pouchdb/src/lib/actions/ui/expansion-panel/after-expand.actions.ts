import { indexName } from '../../../index.config';
import { Tree } from '@gdgtoulouse/components/expansion-panel';
import { SubscriptionConfig as FeaturePouchdbManagerSubscriptionConfig } from '@gdgtoulouse/features/pouchdb-manager';
import {
	createAction,
	props,
	union
	} from '@ngrx/store';

export const topic = 'ui-expansion-panel-after-expand';

export interface Success {
	changesOptionsKey: string;
	databaseConfigurationKey: string;
	destinationList: string[];
}

export const exec = createAction(
	`[${indexName}][${topic}] exec`,
	props<{
		langSubscriptionConfig?: FeaturePouchdbManagerSubscriptionConfig;
		subscriptionConfig?: FeaturePouchdbManagerSubscriptionConfig;
		tree: Tree;
	}>()
);

const all = union({
	exec
});
export type ActionsUnion = typeof all;
