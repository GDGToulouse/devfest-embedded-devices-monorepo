import { indexName } from '../../../index.config';
import { SubscribeRequest } from '@gdgtoulouse/features/pouchdb-manager';
import { createReducer } from '@ngrx/store';

export interface State {
	langSubscribeRequest: SubscribeRequest;
	subscribeRequest: SubscribeRequest;
}

export const initialState: State = {
	langSubscribeRequest: {
		destination: `langs/${indexName}/sidenavs/start/menu`,
		databaseConfiguration: {
			auth: {
				password: 'cloud',
				username: 'cloud'
			},
			name: 'http://localhost:5000/sidenavs-start-default'
		}
	},
	subscribeRequest: {
		destination: `${indexName}/sidenavs/start/menu`,
		databaseConfiguration: {
			auth: {
				password: 'cloud',
				username: 'cloud'
			},
			name: 'http://localhost:5000/sidenavs-start-default'
		}
	}
};

export const reducer = createReducer(initialState);
