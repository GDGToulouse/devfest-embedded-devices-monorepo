import { indexName } from '../../../index.config';
import { SubscriptionConfig as FeaturePouchdbManagerSubscriptionConfig } from '@gdgtoulouse/features/pouchdb-manager';
import {
	createAction,
	props,
	union
	} from '@ngrx/store';

export const topic = 'changes-feeds-subscriptions-socket';

export interface IndexedKeys {
	changesOptionsKey: string;
	databaseConfigurationKey: string;
}

export type Success = IndexedKeys & {
	destinationList: string[];
};

export const subscribe = createAction(`[${indexName}][${topic}] subscribe`, props<{ subscriptionConfig: FeaturePouchdbManagerSubscriptionConfig & { io: { uri: string; opts: SocketIOClient.ConnectOpts } } }>());

const all = union({
	subscribe
});
export type ActionsUnion = typeof all;
