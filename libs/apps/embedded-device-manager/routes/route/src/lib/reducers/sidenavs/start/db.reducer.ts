import { indexName } from '../../../index.config';
import { SubscriptionConfig as FeaturePouchdbManagerSubscriptionConfig } from '@gdgtoulouse/features/pouchdb-manager';
import { createReducer } from '@ngrx/store';

export interface State {
	langSubscriptionConfig: FeaturePouchdbManagerSubscriptionConfig;
	subscriptionConfig: FeaturePouchdbManagerSubscriptionConfig;
}

export const initialState: State = {
	langSubscriptionConfig: {
		destinationList: [`langs/${indexName}/sidenavs/start/menu`],
		databaseConfiguration: {
			auth: {
				password: 'cloud',
				username: 'cloud'
			},
			name: 'http://localhost:5000/menu-default'
		},
		changesOptions: {
			include_docs: true,
			limit: 500
		}
	},
	subscriptionConfig: {
		destinationList: [`${indexName}/sidenavs/start/menu`],
		databaseConfiguration: {
			auth: {
				password: 'cloud',
				username: 'cloud'
			},
			name: 'http://localhost:5000/menu-default'
		},
		changesOptions: {
			include_docs: true,
			limit: 500
		}
	}
};

export const reducer = createReducer(initialState);
