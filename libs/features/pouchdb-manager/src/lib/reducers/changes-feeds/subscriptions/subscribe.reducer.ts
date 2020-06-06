import { Actions as FeatureActions } from '../../../actions';
import {
	Keys,
	RegisterChangesOptions,
	RegisterDatabaseConfiguration
	} from '@gdgtoulouse/structures/pouchdb-manager';
import {
	createReducer,
	on
	} from '@ngrx/store';

export interface Subscriptions {
	[destination: string]: Subscriptions | Keys;
}

export interface Documents {
	[databaseConfigurationKey: string]: {
		databaseConfiguration: RegisterDatabaseConfiguration;
		changesFeeds: {
			[changesOptionsKey: string]: {
				changesOptions: RegisterChangesOptions;
				since0CompleteInfo: PouchDB.Core.ChangesResponse<{}>;
				liveSinceLastSeqChangeList: PouchDB.Core.ChangesResponseChange<{}>[];
			};
		};
	};
}

export interface State {
	documents: Documents;
	isConnected: boolean;
	subscriptions: Subscriptions;
}

export const initialState: State = {
	documents: {},
	isConnected: null,
	subscriptions: {}
};

export const addDestinationSegmentListToSubscriptions = ({ destinationSegmentList, keys, subscriptions }: { destinationSegmentList: string[]; keys: Keys; subscriptions: Subscriptions }) => {
	let currentSubscriptions = subscriptions;
	let currentSubscriptionsKeyList = Object.keys(currentSubscriptions);

	for (let destinationSegmentListIndex = 0; destinationSegmentListIndex < destinationSegmentList.length - 1; destinationSegmentListIndex++) {
		const destinationSegment = destinationSegmentList[destinationSegmentListIndex];
		const destinationSegmentDoesNotExistYetInCurrentSubscriptions = !currentSubscriptionsKeyList.includes(destinationSegment);
		if (destinationSegmentDoesNotExistYetInCurrentSubscriptions) {
			currentSubscriptions[destinationSegment] = {};
		}
		const destinationSegmentExistsButIsKeys = Object.keys(currentSubscriptions[destinationSegment]).filter((key) => key === 'databaseConfigurationKey' || key === 'changesOptionsKey').length === 2;
		if (destinationSegmentExistsButIsKeys) {
			return subscriptions;
		} else {
			currentSubscriptions = <{}>currentSubscriptions[destinationSegment];
		}
		currentSubscriptionsKeyList = Object.keys(currentSubscriptions);
	}

	currentSubscriptions[destinationSegmentList[destinationSegmentList.length - 1]] = keys;

	return subscriptions;
};

export const reducer = createReducer(
	initialState,
	on(
		FeatureActions.ChangesFeeds.Subscriptions.Socket.connect,
		FeatureActions.ChangesFeeds.Subscriptions.Socket.reconnect,
		(state, _): State => {
			return {
				...state,
				isConnected: true
			};
		}
	),
	on(
		FeatureActions.ChangesFeeds.Subscriptions.Socket.disconnect,
		(state, _): State => {
			return {
				...state,
				isConnected: false
			};
		}
	),
	on(
		FeatureActions.ChangesFeeds.Subscriptions.Socket.registerSucceeded,
		(state, { destination, databaseConfiguration, databaseConfigurationKey, changesOptions, changesOptionsKey }): State => {
			const subscriptions = addDestinationSegmentListToSubscriptions({ destinationSegmentList: destination.split('/'), keys: { databaseConfigurationKey, changesOptionsKey }, subscriptions: { ...state.subscriptions } });
			const databaseConfigurationKeyExists = Object.keys(state.documents).includes(databaseConfigurationKey);
			if (databaseConfigurationKeyExists) {
				const changesOptionsKeyExists = Object.keys(state.documents[databaseConfigurationKey].changesFeeds).includes(changesOptionsKey);
				if (changesOptionsKeyExists) {
					return {
						...state,
						documents: {
							...state.documents,
							[databaseConfigurationKey]: {
								...state.documents[databaseConfigurationKey],
								databaseConfiguration,
								changesFeeds: {
									...state.documents[databaseConfigurationKey].changesFeeds,
									[changesOptionsKey]: {
										...state.documents[databaseConfigurationKey].changesFeeds[changesOptionsKey],
										changesOptions
									}
								}
							}
						},
						subscriptions
					};
				} else {
					return {
						...state,
						documents: {
							...state.documents,
							[databaseConfigurationKey]: {
								...state.documents[databaseConfigurationKey],
								databaseConfiguration,
								changesFeeds: {
									...state.documents[databaseConfigurationKey].changesFeeds,
									[changesOptionsKey]: {
										changesOptions,
										since0CompleteInfo: null,
										liveSinceLastSeqChangeList: []
									}
								}
							}
						},
						subscriptions
					};
				}
			} else {
				return {
					...state,
					documents: {
						...state.documents,
						[databaseConfigurationKey]: {
							databaseConfiguration,
							changesFeeds: {
								[changesOptionsKey]: {
									changesOptions,
									since0CompleteInfo: null,
									liveSinceLastSeqChangeList: []
								}
							}
						}
					},
					subscriptions
				};
			}
		}
	),
	on(
		FeatureActions.ChangesFeeds.Subscriptions.Socket.since0CompleteInfo,
		(state, { since0EmitsCompleteInfo: { databaseConfigurationKey, changesOptionsKey, since0CompleteInfo } }): State => {
			const subscriptions = { ...state.subscriptions };
			const databaseExists = Object.keys(state.documents).includes(databaseConfigurationKey);
			if (databaseExists) {
				const changesOptionsKeyExists = Object.keys(state.documents[databaseConfigurationKey].changesFeeds).includes(changesOptionsKey);
				if (changesOptionsKeyExists) {
					return {
						...state,
						documents: {
							...state.documents,
							[databaseConfigurationKey]: {
								...state.documents[databaseConfigurationKey],
								changesFeeds: {
									...state.documents[databaseConfigurationKey].changesFeeds,
									[changesOptionsKey]: {
										...state.documents[databaseConfigurationKey].changesFeeds[changesOptionsKey],
										since0CompleteInfo,
										liveSinceLastSeqChangeList: []
									}
								}
							}
						}
					};
				} else {
					return {
						...state,
						documents: {
							...state.documents,
							[databaseConfigurationKey]: {
								...state.documents[databaseConfigurationKey],
								changesFeeds: {
									...state.documents[databaseConfigurationKey].changesFeeds,
									[changesOptionsKey]: {
										changesOptions: null,
										since0CompleteInfo,
										liveSinceLastSeqChangeList: []
									}
								}
							}
						}
					};
				}
			} else {
				return {
					...state,
					documents: {
						...state.documents,
						[databaseConfigurationKey]: {
							databaseConfiguration: null,
							changesFeeds: {
								[changesOptionsKey]: {
									changesOptions: null,
									since0CompleteInfo,
									liveSinceLastSeqChangeList: []
								}
							}
						}
					}
				};
			}
		}
	),
	on(
		FeatureActions.ChangesFeeds.Subscriptions.Socket.liveSinceLastSeqChange,
		(state, { liveSinceLastSeqEmitsChange: { databaseConfigurationKey, changesOptionsKey, liveSinceLastSeqChange } }): State => {
			const subscriptions = { ...state.subscriptions };
			const databaseExists = Object.keys(state.documents).includes(databaseConfigurationKey);
			if (databaseExists) {
				const changesExists = Object.keys(state.documents[databaseConfigurationKey].changesFeeds).includes(changesOptionsKey);
				if (changesExists) {
					return {
						...state,
						documents: {
							...state.documents,
							[databaseConfigurationKey]: {
								...state.documents[databaseConfigurationKey],
								changesFeeds: {
									...state.documents[databaseConfigurationKey].changesFeeds,
									[changesOptionsKey]: {
										...state.documents[databaseConfigurationKey].changesFeeds[changesOptionsKey],
										liveSinceLastSeqChangeList: [...state.documents[databaseConfigurationKey].changesFeeds[changesOptionsKey].liveSinceLastSeqChangeList, liveSinceLastSeqChange]
									}
								}
							}
						}
					};
				} else {
					throw Error(`Changes does not exists yet but ask for live`);
				}
			} else {
				throw Error(`Database does not exists yet but ask for live`);
			}
		}
	)
);
