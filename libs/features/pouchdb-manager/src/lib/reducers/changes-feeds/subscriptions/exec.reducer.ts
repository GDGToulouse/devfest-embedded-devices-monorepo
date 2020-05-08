import { Actions as FeatureActions } from '../../../actions';
import {
	createReducer,
	on
	} from '@ngrx/store';

export interface State {
	subscriptions: { [subscriber: string]: { databaseConfigurationKey: string; changesOptionsKey: string } };
	databases: {
		[databaseConfigurationKey: string]: {
			changesFeeds: {
				[changesOptionsKey: string]: {
					changeList: PouchDB.Core.ChangesResponseChange<{}>[];
					completeInfo: PouchDB.Core.ChangesResponse<{}>;
					sync?: {
						changeList: PouchDB.Core.ChangesResponseChange<{}>[];
						completeInfo: PouchDB.Core.ChangesResponse<{}>;
					};
				};
			};
		};
	};
}

export const initialState: State = {
	databases: {},
	subscriptions: {}
};

export const reducer = createReducer(
	initialState,
	on(
		FeatureActions.ChangesFeeds.Subscriptions.Exec.change,
		(state, { databaseConfigurationKey, changesOptionsKey, change, subscriber }): State => {
			const isDatabasesEmpty = Object.keys(state.databases).length === 0;
			if (isDatabasesEmpty) {
				return {
					...state,
					databases: {
						[databaseConfigurationKey]: {
							changesFeeds: {
								[changesOptionsKey]: {
									changeList: [change],
									completeInfo: null
								}
							}
						}
					},
					subscriptions: {
						...state.subscriptions,
						[subscriber]: {
							...state.subscriptions[subscriber],
							changesOptionsKey,
							databaseConfigurationKey
						}
					}
				};
			} else {
				const databaseKeyAlreadyExist = Object.keys(state.databases).includes(databaseConfigurationKey);
				if (databaseKeyAlreadyExist) {
					const isChangesFeedsInitialized = Object.keys(state.databases[databaseConfigurationKey]).includes('changesFeeds');
					if (isChangesFeedsInitialized) {
						const changesOptionsKeyAlreadyExist = Object.keys(state.databases).includes(databaseConfigurationKey);
						if (changesOptionsKeyAlreadyExist) {
							return {
								...state,
								databases: {
									...state.databases,
									[databaseConfigurationKey]: {
										...state.databases[databaseConfigurationKey],
										changesFeeds: {
											...state.databases[databaseConfigurationKey].changesFeeds,
											[changesOptionsKey]: {
												...state.databases[databaseConfigurationKey].changesFeeds[changesOptionsKey],
												changeList: [...state.databases[databaseConfigurationKey].changesFeeds[changesOptionsKey].changeList, change]
											}
										}
									}
								},
								subscriptions: {
									...state.subscriptions,
									[subscriber]: {
										...state.subscriptions[subscriber],
										changesOptionsKey,
										databaseConfigurationKey
									}
								}
							};
						} else {
							return {
								...state,
								databases: {
									...state.databases,
									[databaseConfigurationKey]: {
										...state.databases[databaseConfigurationKey],
										changesFeeds: {
											...state.databases[databaseConfigurationKey].changesFeeds,
											[changesOptionsKey]: {
												changeList: [change],
												completeInfo: null
											}
										}
									}
								},
								subscriptions: {
									...state.subscriptions,
									[subscriber]: {
										...state.subscriptions[subscriber],
										changesOptionsKey,
										databaseConfigurationKey
									}
								}
							};
						}
					} else {
						return {
							...state,
							databases: {
								...state.databases,
								[databaseConfigurationKey]: {
									...state.databases[databaseConfigurationKey],
									changesFeeds: {
										[changesOptionsKey]: {
											changeList: [change],
											completeInfo: null
										}
									}
								}
							},
							subscriptions: {
								...state.subscriptions,
								[subscriber]: {
									...state.subscriptions[subscriber],
									changesOptionsKey,
									databaseConfigurationKey
								}
							}
						};
					}
				} else {
					return {
						...state,
						databases: {
							...state.databases,
							[databaseConfigurationKey]: {
								changesFeeds: {
									[changesOptionsKey]: {
										changeList: [change],
										completeInfo: null
									}
								}
							}
						},
						subscriptions: {
							...state.subscriptions,
							[subscriber]: {
								...state.subscriptions[subscriber],
								changesOptionsKey,
								databaseConfigurationKey
							}
						}
					};
				}
			}
		}
	),
	on(
		FeatureActions.ChangesFeeds.Subscriptions.Exec.complete,
		(state, { databaseConfigurationKey, changesOptionsKey, completeInfo }): State => ({
			...state,
			databases: {
				...state.databases,
				[databaseConfigurationKey]: {
					...state.databases[databaseConfigurationKey],
					changesFeeds: {
						...state.databases[databaseConfigurationKey].changesFeeds,
						[changesOptionsKey]: {
							...state.databases[databaseConfigurationKey].changesFeeds[changesOptionsKey],
							completeInfo
						}
					}
				}
			}
		})
	)
);
