import { Actions as FeatureActions } from '../actions';
import {
	createReducer,
	on
	} from '@ngrx/store';
import PouchDB from 'pouchdb-core';
import PouchFind from 'pouchdb-find';
PouchDB.plugin(PouchFind);

export interface PouchdbBus {
	databases: {
		[databaseId: string]: {
			config: any;
			name: string;
            findRequests: {
                [findRequestId: string]: {
                    req: any;
                    findResponses: {
                        since0: any;
						live: any;
						docList: {id: string, pid: string}[];
                    }
				}
			}
		}
	}
}

export const initialState: PouchdbBus = {
	databases: {
		"local-hardware-menu-db": {
			config: null,
			name: "name",
            findRequests: {
                "null": {
                    req: null,
                    findResponses: {
                        since0: null,
						live: null,
						docList: [
							{id: "toto", pid: null}, {id: "tata", pid: null}
						],
                    }
				}
			}
		}
	}
};

export const reducer = createReducer(
	initialState,
	on(FeatureActions.Grid.resetToInitialState, () => initialState),
);