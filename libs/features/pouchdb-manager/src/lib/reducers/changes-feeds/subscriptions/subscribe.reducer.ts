import { Actions as FeatureActions } from '../../../actions';
import { IndexedKeys } from '../../../actions/changes-feeds/subscriptions/exec.actions';
import {
	createReducer,
	on
	} from '@ngrx/store';

export type Subscriptions = { [destination: string]: Subscriptions | IndexedKeys };

export interface Sync<T> {
	changeList: PouchDB.Core.ChangesResponseChange<T>[];
	completeInfo: PouchDB.Core.ChangesResponse<T>;
	error: any;
}

export interface State {
	subscriptions: Subscriptions;
	databases: {
		[databaseConfigurationKey: string]: {
			changesFeeds: {
				[changesOptionsKey: string]: {
					changeList: PouchDB.Core.ChangesResponseChange<{}>[];
					completeInfo: PouchDB.Core.ChangesResponse<{}>;
					error: any;
					sync?: Sync<{}>;
				};
			};
		};
	};
}

export const initialState: State = {
	databases: {},
	subscriptions: {}
};

export const addDestinationSegmentListToSubscriptions = ({ destinationSegmentList, indexedKeys, subscriptions }: { destinationSegmentList: string[]; indexedKeys: IndexedKeys; subscriptions: Subscriptions }) => {
	let currentSubscriptions = subscriptions;
	let currentSubscriptionsKeyList = Object.keys(currentSubscriptions);

	for (let destinationSegmentListIndex = 0; destinationSegmentListIndex < destinationSegmentList.length - 1; destinationSegmentListIndex++) {
		const destinationSegment = destinationSegmentList[destinationSegmentListIndex];
		const destinationSegmentDoesNotExistYetInCurrentSubscriptions = !currentSubscriptionsKeyList.includes(destinationSegment);
		if (destinationSegmentDoesNotExistYetInCurrentSubscriptions) {
			currentSubscriptions[destinationSegment] = {};
		}
		const destinationSegmentExistsButIsIndexedKeys = Object.keys(currentSubscriptions[destinationSegment]).filter((key) => key === 'databaseConfigurationKey' || key === 'changesOptionsKey').length === 2;
		if (destinationSegmentExistsButIsIndexedKeys) {
			throw Error(`Indexed keys already specified at ${destinationSegment} for ${JSON.stringify(currentSubscriptions, null, '\t')} - Input was ${JSON.stringify({ destinationSegmentList, indexedKeys, subscriptions }, null, '\t')}`);
		} else {
			currentSubscriptions = <{}>currentSubscriptions[destinationSegment];
		}
		currentSubscriptionsKeyList = Object.keys(currentSubscriptions);
	}

	currentSubscriptions[destinationSegmentList[destinationSegmentList.length - 1]] = indexedKeys;

	return subscriptions;
};

export const reducer = createReducer(
	initialState,
	on(
		FeatureActions.ChangesFeeds.Subscriptions.Exec.success,
		(state, { success: { changesOptionsKey, databaseConfigurationKey, destinationList } }): State => {
			let subscriptions: Subscriptions = { ...state.subscriptions };
			destinationList.forEach((destination) => {
				subscriptions = addDestinationSegmentListToSubscriptions({ destinationSegmentList: destination.split('/'), indexedKeys: { changesOptionsKey, databaseConfigurationKey }, subscriptions });
			});
			return {
				...state,
				subscriptions
			};
		}
	),
	on(
		FeatureActions.ChangesFeeds.Subscriptions.Exec.changesError,
		(state, { databaseConfigurationKey, changesOptionsKey, error }): State => {
			const isDatabasesEmpty = Object.keys(state.databases).length === 0;
			if (isDatabasesEmpty) {
				return {
					...state,
					databases: {
						[databaseConfigurationKey]: {
							changesFeeds: {
								[changesOptionsKey]: {
									changeList: [],
									completeInfo: null,
									error
								}
							}
						}
					}
				};
			} else {
				const databaseKeyAlreadyExist = Object.keys(state.databases).includes(databaseConfigurationKey);
				if (databaseKeyAlreadyExist) {
					const isChangesFeedsInitialized = Object.keys(state.databases[databaseConfigurationKey]).includes('changesFeeds');
					if (isChangesFeedsInitialized) {
						const changesOptionsKeyAlreadyExist = Object.keys(state.databases[databaseConfigurationKey].changesFeeds).includes(changesOptionsKey);
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
												error
											}
										}
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
												changeList: [],
												completeInfo: null,
												error
											}
										}
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
											changeList: [],
											completeInfo: null,
											error
										}
									}
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
										changeList: [],
										completeInfo: null,
										error
									}
								}
							}
						}
					};
				}
			}
		}
	),
	on(
		FeatureActions.ChangesFeeds.Subscriptions.Exec.changesComplete,
		(state, { databaseConfigurationKey, changesOptionsKey, completeInfo }): State => {
			const isDatabasesEmpty = Object.keys(state.databases).length === 0;
			if (isDatabasesEmpty) {
				return {
					...state,
					databases: {
						[databaseConfigurationKey]: {
							changesFeeds: {
								[changesOptionsKey]: {
									changeList: [],
									completeInfo,
									error: null
								}
							}
						}
					}
				};
			} else {
				const databaseKeyAlreadyExist = Object.keys(state.databases).includes(databaseConfigurationKey);
				if (databaseKeyAlreadyExist) {
					const isChangesFeedsInitialized = Object.keys(state.databases[databaseConfigurationKey]).includes('changesFeeds');
					if (isChangesFeedsInitialized) {
						const changesOptionsKeyAlreadyExist = Object.keys(state.databases[databaseConfigurationKey].changesFeeds).includes(changesOptionsKey);
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
												completeInfo
											}
										}
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
												changeList: [],
												completeInfo,
												error: null
											}
										}
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
											changeList: [],
											completeInfo,
											error: null
										}
									}
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
										changeList: [],
										completeInfo,
										error: null
									}
								}
							}
						}
					};
				}
			}
		}
	),
	on(
		FeatureActions.ChangesFeeds.Subscriptions.Sync.success,
		(state, { success: { changesOptionsKey, databaseConfigurationKey, destinationList } }): State => {
			let subscriptions: Subscriptions = { ...state.subscriptions };
			destinationList.forEach((destination) => {
				subscriptions = addDestinationSegmentListToSubscriptions({ destinationSegmentList: destination.split('/'), indexedKeys: { changesOptionsKey, databaseConfigurationKey }, subscriptions });
			});
			return {
				...state,
				subscriptions
			};
		}
	),
	on(
		FeatureActions.ChangesFeeds.Subscriptions.Sync.since0ChangesError,
		(state, { databaseConfigurationKey, changesOptionsKey, error }): State => {
			const isDatabasesEmpty = Object.keys(state.databases).length === 0;
			if (isDatabasesEmpty) {
				return {
					...state,
					databases: {
						[databaseConfigurationKey]: {
							changesFeeds: {
								[changesOptionsKey]: {
									changeList: [],
									completeInfo: null,
									error
								}
							}
						}
					}
				};
			} else {
				const databaseKeyAlreadyExist = Object.keys(state.databases).includes(databaseConfigurationKey);
				if (databaseKeyAlreadyExist) {
					const isChangesFeedsInitialized = Object.keys(state.databases[databaseConfigurationKey]).includes('changesFeeds');
					if (isChangesFeedsInitialized) {
						const changesOptionsKeyAlreadyExist = Object.keys(state.databases[databaseConfigurationKey].changesFeeds).includes(changesOptionsKey);
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
												error
											}
										}
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
												changeList: [],
												completeInfo: null,
												error
											}
										}
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
											changeList: [],
											completeInfo: null,
											error
										}
									}
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
										changeList: [],
										completeInfo: null,
										error
									}
								}
							}
						}
					};
				}
			}
		}
	),
	on(
		FeatureActions.ChangesFeeds.Subscriptions.Sync.since0ChangesChange,
		(state, { databaseConfigurationKey, changesOptionsKey, change }): State => {
			const isDatabasesEmpty = Object.keys(state.databases).length === 0;
			if (isDatabasesEmpty) {
				return {
					...state,
					databases: {
						[databaseConfigurationKey]: {
							changesFeeds: {
								[changesOptionsKey]: {
									changeList: [change],
									completeInfo: null,
									error: null
								}
							}
						}
					}
				};
			} else {
				const databaseKeyAlreadyExist = Object.keys(state.databases).includes(databaseConfigurationKey);
				if (databaseKeyAlreadyExist) {
					const isChangesFeedsInitialized = Object.keys(state.databases[databaseConfigurationKey]).includes('changesFeeds');
					if (isChangesFeedsInitialized) {
						const changesOptionsKeyAlreadyExist = Object.keys(state.databases[databaseConfigurationKey].changesFeeds).includes(changesOptionsKey);
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
												completeInfo: null,
												error: null
											}
										}
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
											completeInfo: null,
											error: null
										}
									}
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
										completeInfo: null,
										error: null
									}
								}
							}
						}
					};
				}
			}
		}
	),
	on(
		FeatureActions.ChangesFeeds.Subscriptions.Sync.since0ChangesComplete,
		(state, { databaseConfigurationKey, changesOptionsKey, completeInfo }): State => {
			const isDatabasesEmpty = Object.keys(state.databases).length === 0;
			if (isDatabasesEmpty) {
				return {
					...state,
					databases: {
						[databaseConfigurationKey]: {
							changesFeeds: {
								[changesOptionsKey]: {
									changeList: [],
									completeInfo,
									error: null,
									sync: {
										changeList: [],
										completeInfo: null,
										error: null
									}
								}
							}
						}
					}
				};
			} else {
				const databaseKeyAlreadyExist = Object.keys(state.databases).includes(databaseConfigurationKey);
				if (databaseKeyAlreadyExist) {
					const isChangesFeedsInitialized = Object.keys(state.databases[databaseConfigurationKey]).includes('changesFeeds');
					if (isChangesFeedsInitialized) {
						const changesOptionsKeyAlreadyExist = Object.keys(state.databases[databaseConfigurationKey].changesFeeds).includes(changesOptionsKey);
						if (changesOptionsKeyAlreadyExist) {
							const syncKeyAlreadyExist = Object.keys(state.databases[databaseConfigurationKey].changesFeeds[changesOptionsKey]).includes('sync');
							if (syncKeyAlreadyExist) {
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
													completeInfo
												}
											}
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
													...state.databases[databaseConfigurationKey].changesFeeds[changesOptionsKey],
													completeInfo,
													sync: {
														changeList: [],
														completeInfo: null,
														error: null
													}
												}
											}
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
											...state.databases[databaseConfigurationKey].changesFeeds,
											[changesOptionsKey]: {
												changeList: [],
												completeInfo,
												error: null,
												sync: {
													changeList: [],
													completeInfo: null,
													error: null
												}
											}
										}
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
											changeList: [],
											completeInfo,
											error: null,
											sync: {
												changeList: [],
												completeInfo: null,
												error: null
											}
										}
									}
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
										changeList: [],
										completeInfo,
										error: null,
										sync: {
											changeList: [],
											completeInfo: null,
											error: null
										}
									}
								}
							}
						}
					};
				}
			}
		}
	),
	on(
		FeatureActions.ChangesFeeds.Subscriptions.Sync.liveSinceLastSeqChangesError,
		(state, { databaseConfigurationKey, changesOptionsKey, error }): State => {
			const isDatabasesEmpty = Object.keys(state.databases).length === 0;
			if (isDatabasesEmpty) {
				return {
					...state,
					databases: {
						[databaseConfigurationKey]: {
							changesFeeds: {
								[changesOptionsKey]: {
									changeList: [],
									completeInfo: null,
									error: null,
									sync: {
										changeList: [],
										completeInfo: null,
										error
									}
								}
							}
						}
					}
				};
			} else {
				const databaseKeyAlreadyExist = Object.keys(state.databases).includes(databaseConfigurationKey);
				if (databaseKeyAlreadyExist) {
					const isChangesFeedsInitialized = Object.keys(state.databases[databaseConfigurationKey]).includes('changesFeeds');
					if (isChangesFeedsInitialized) {
						const changesOptionsKeyAlreadyExist = Object.keys(state.databases[databaseConfigurationKey].changesFeeds).includes(changesOptionsKey);
						if (changesOptionsKeyAlreadyExist) {
							const syncKeyAlreadyExist = Object.keys(state.databases[databaseConfigurationKey].changesFeeds[changesOptionsKey]).includes('sync');
							if (syncKeyAlreadyExist) {
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
													sync: {
														...state.databases[databaseConfigurationKey].changesFeeds[changesOptionsKey].sync,
														error
													}
												}
											}
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
													...state.databases[databaseConfigurationKey].changesFeeds[changesOptionsKey],
													sync: {
														changeList: [],
														completeInfo: null,
														error
													}
												}
											}
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
											...state.databases[databaseConfigurationKey].changesFeeds,
											[changesOptionsKey]: {
												changeList: [],
												completeInfo: null,
												error: null,
												sync: {
													changeList: [],
													completeInfo: null,
													error
												}
											}
										}
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
											changeList: [],
											completeInfo: null,
											error: null,
											sync: {
												changeList: [],
												completeInfo: null,
												error
											}
										}
									}
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
										changeList: [],
										completeInfo: null,
										error: null,
										sync: {
											changeList: [],
											completeInfo: null,
											error
										}
									}
								}
							}
						}
					};
				}
			}
		}
	),
	on(
		FeatureActions.ChangesFeeds.Subscriptions.Sync.liveSinceLastSeqChangesChange,
		(state, { databaseConfigurationKey, changesOptionsKey, change }): State => {
			const isDatabasesEmpty = Object.keys(state.databases).length === 0;
			if (isDatabasesEmpty) {
				return {
					...state,
					databases: {
						[databaseConfigurationKey]: {
							changesFeeds: {
								[changesOptionsKey]: {
									changeList: [],
									completeInfo: null,
									error: null,
									sync: {
										changeList: [change],
										completeInfo: null,
										error: null
									}
								}
							}
						}
					}
				};
			} else {
				const databaseKeyAlreadyExist = Object.keys(state.databases).includes(databaseConfigurationKey);
				if (databaseKeyAlreadyExist) {
					const isChangesFeedsInitialized = Object.keys(state.databases[databaseConfigurationKey]).includes('changesFeeds');
					if (isChangesFeedsInitialized) {
						const changesOptionsKeyAlreadyExist = Object.keys(state.databases[databaseConfigurationKey].changesFeeds).includes(changesOptionsKey);
						if (changesOptionsKeyAlreadyExist) {
							const syncKeyAlreadyExist = Object.keys(state.databases[databaseConfigurationKey].changesFeeds[changesOptionsKey]).includes('sync');
							if (syncKeyAlreadyExist) {
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
													sync: {
														...state.databases[databaseConfigurationKey].changesFeeds[changesOptionsKey].sync,
														changeList: [...state.databases[databaseConfigurationKey].changesFeeds[changesOptionsKey].sync.changeList, change]
													}
												}
											}
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
													...state.databases[databaseConfigurationKey].changesFeeds[changesOptionsKey],
													sync: {
														changeList: [change],
														completeInfo: null,
														error: null
													}
												}
											}
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
											...state.databases[databaseConfigurationKey].changesFeeds,
											[changesOptionsKey]: {
												changeList: [],
												completeInfo: null,
												error: null,
												sync: {
													changeList: [change],
													completeInfo: null,
													error: null
												}
											}
										}
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
											changeList: [],
											completeInfo: null,
											error: null,
											sync: {
												changeList: [change],
												completeInfo: null,
												error: null
											}
										}
									}
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
										changeList: [],
										completeInfo: null,
										error: null,
										sync: {
											changeList: [change],
											completeInfo: null,
											error: null
										}
									}
								}
							}
						}
					};
				}
			}
		}
	),
	on(
		FeatureActions.ChangesFeeds.Subscriptions.Sync.liveSinceLastSeqChangesComplete,
		(state, { databaseConfigurationKey, changesOptionsKey, completeInfo }): State => {
			const isDatabasesEmpty = Object.keys(state.databases).length === 0;
			if (isDatabasesEmpty) {
				return {
					...state,
					databases: {
						[databaseConfigurationKey]: {
							changesFeeds: {
								[changesOptionsKey]: {
									changeList: [],
									completeInfo: null,
									error: null,
									sync: {
										changeList: [],
										completeInfo,
										error: null
									}
								}
							}
						}
					}
				};
			} else {
				const databaseKeyAlreadyExist = Object.keys(state.databases).includes(databaseConfigurationKey);
				if (databaseKeyAlreadyExist) {
					const isChangesFeedsInitialized = Object.keys(state.databases[databaseConfigurationKey]).includes('changesFeeds');
					if (isChangesFeedsInitialized) {
						const changesOptionsKeyAlreadyExist = Object.keys(state.databases[databaseConfigurationKey].changesFeeds).includes(changesOptionsKey);
						if (changesOptionsKeyAlreadyExist) {
							const syncKeyAlreadyExist = Object.keys(state.databases[databaseConfigurationKey].changesFeeds[changesOptionsKey]).includes('sync');
							if (syncKeyAlreadyExist) {
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
													sync: {
														...state.databases[databaseConfigurationKey].changesFeeds[changesOptionsKey].sync,
														completeInfo
													}
												}
											}
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
													...state.databases[databaseConfigurationKey].changesFeeds[changesOptionsKey],
													sync: {
														changeList: [],
														completeInfo,
														error: null
													}
												}
											}
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
											...state.databases[databaseConfigurationKey].changesFeeds,
											[changesOptionsKey]: {
												changeList: [],
												completeInfo: null,
												error: null,
												sync: {
													changeList: [],
													completeInfo,
													error: null
												}
											}
										}
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
											changeList: [],
											completeInfo: null,
											error: null,
											sync: {
												changeList: [],
												completeInfo,
												error: null
											}
										}
									}
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
										changeList: [],
										completeInfo: null,
										error: null,
										sync: {
											changeList: [],
											completeInfo,
											error: null
										}
									}
								}
							}
						}
					};
				}
			}
		}
	)
);
