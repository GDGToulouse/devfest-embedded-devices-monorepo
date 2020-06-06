import { indexName } from '../index.config';
import {
	isDocArchived,
	KeysInterpretation,
	KeysInterpretationAtDestination
	} from '../models';
import {
	FeatureState,
	State
	} from '../reducers';
import { Subscriptions } from '../reducers/changes-feeds/subscriptions/subscribe.reducer';
import { Keys } from '@gdgtoulouse/structures/pouchdb-manager';
import {
	createFeatureSelector,
	createSelector
	} from '@ngrx/store';

//#region feature
export const getFeatureState$ = createFeatureSelector<State, FeatureState>(indexName);
//#endregion

//#region helpers TODO: study if put elsewhere (for instance for getUniqueDocList)
export const getUniqueDocList = (docList: PouchDB.Core.ExistingDocument<PouchDB.Core.ChangesMeta>[]) => {
	const uniqueDocList: PouchDB.Core.ExistingDocument<PouchDB.Core.ChangesMeta>[] = [];
	const map = new Map();
	for (const doc of docList) {
		if (!map.has(`${doc._id}${doc._rev}`)) {
			map.set(`${doc._id}${doc._rev}`, true);
			uniqueDocList.push(doc);
		}
	}
	return uniqueDocList;
};

export const grabKeysList = ({ keysList, subscriptions }: { keysList: Keys[]; subscriptions: Subscriptions | Keys }): Keys[] => {
	const subscriptionsKeyList = Object.keys(subscriptions);
	const subscriptionsIsKeys = subscriptionsKeyList.filter((key) => key === 'databaseConfigurationKey' || key === 'changesOptionsKey').length === 2;
	if (subscriptionsIsKeys) {
		return keysList.concat([<Keys>subscriptions]);
	} else {
		return subscriptionsKeyList.reduce((_keysList, subscriptionsKey) => _keysList.concat(grabKeysList({ keysList, subscriptions: subscriptions[subscriptionsKey] })), <Keys[]>[]);
	}
};

export const findKeysList = ({ destinationSegmentList, subscriptions }: { destinationSegmentList: string[]; subscriptions: Subscriptions }) => {
	let currentSubscriptions = subscriptions;
	let currentSubscriptionsKeyList = Object.keys(currentSubscriptions);

	for (let destinationSegmentListIndex = 0; destinationSegmentListIndex < destinationSegmentList.length; destinationSegmentListIndex++) {
		const destinationSegment = destinationSegmentList[destinationSegmentListIndex];
		const destinationSegmentExistsInCurrentSubscriptions = currentSubscriptionsKeyList.includes(destinationSegment);
		if (destinationSegmentExistsInCurrentSubscriptions) {
			currentSubscriptions = <Subscriptions>currentSubscriptions[destinationSegment];
			currentSubscriptionsKeyList = Object.keys(currentSubscriptions);
		} else {
			return [];
		}
	}

	return grabKeysList({ keysList: [], subscriptions: currentSubscriptions });
};

export const grabKeysInterpretationAtDestinationList = ({ keysList, subscriptions, currentDestination, interpretKeys }: { keysList: Keys[]; subscriptions: Subscriptions | Keys; currentDestination: string; interpretKeys: ({ databaseConfigurationKey, changesOptionsKey }: Keys) => KeysInterpretation }): KeysInterpretationAtDestination[] => {
	const subscriptionsKeyList = Object.keys(subscriptions);
	const subscriptionsIsKeys = subscriptionsKeyList.filter((key) => key === 'databaseConfigurationKey' || key === 'changesOptionsKey').length === 2;
	if (subscriptionsIsKeys) {
		return (<KeysInterpretationAtDestination[]>(<any[]>keysList)).concat([<KeysInterpretationAtDestination>{ ...interpretKeys(<Keys>{ ...subscriptions }), destination: currentDestination.slice(0, -1) }]);
	} else {
		return subscriptionsKeyList.reduce((_keysList, subscriptionsKey) => _keysList.concat(grabKeysInterpretationAtDestinationList({ keysList, subscriptions: subscriptions[subscriptionsKey], currentDestination: `${currentDestination}${subscriptionsKey}/`, interpretKeys })), <KeysInterpretationAtDestination[]>[]);
	}
};

export const findKeysInterpretationAtDestinationList = ({ destinationSegmentList, subscriptions, interpretKeys }: { destinationSegmentList: string[]; subscriptions: Subscriptions; interpretKeys: ({ databaseConfigurationKey, changesOptionsKey }: Keys) => KeysInterpretation }) => {
	let currentSubscriptions = subscriptions;
	let currentSubscriptionsKeyList = Object.keys(currentSubscriptions);
	let currentDestination = '';

	for (let destinationSegmentListIndex = 0; destinationSegmentListIndex < destinationSegmentList.length; destinationSegmentListIndex++) {
		const destinationSegment = destinationSegmentList[destinationSegmentListIndex];
		const destinationSegmentExistsInCurrentSubscriptions = currentSubscriptionsKeyList.includes(destinationSegment);
		if (destinationSegmentExistsInCurrentSubscriptions) {
			currentDestination = `${currentDestination}${destinationSegment}/`;
			currentSubscriptions = <Subscriptions>currentSubscriptions[destinationSegment];
			currentSubscriptionsKeyList = Object.keys(currentSubscriptions);
		} else {
			return [];
		}
	}

	return grabKeysInterpretationAtDestinationList({ keysList: [], subscriptions: currentSubscriptions, currentDestination, interpretKeys });
};
//#endregion

//#region changesFeeds
export const changesFeedsSubscriptionsSubscribe$ = createSelector(getFeatureState$, ({ changesFeedsSubscriptionsSubscribe }) => changesFeedsSubscriptionsSubscribe);
export const documents$ = createSelector(changesFeedsSubscriptionsSubscribe$, ({ documents }) => documents);
export const interpretKeys$ = createSelector(documents$, (documents) => ({ databaseConfigurationKey, changesOptionsKey }: Keys) => {
	const keysInterpretation: KeysInterpretation = {
		databaseConfigurationKey,
		changesOptionsKey,
		databaseConfiguration: documents[databaseConfigurationKey].databaseConfiguration,
		changesOptions: documents[databaseConfigurationKey].changesFeeds[changesOptionsKey].changesOptions
	};
	return keysInterpretation;
});
export const isConnected$ = createSelector(changesFeedsSubscriptionsSubscribe$, ({ isConnected }) => isConnected);
export const subscriptions$ = createSelector(changesFeedsSubscriptionsSubscribe$, ({ subscriptions }) => subscriptions);
export const keysList$ = (destination: string) => createSelector(subscriptions$, (subscriptions) => findKeysList({ destinationSegmentList: destination.split('/'), subscriptions }));
export const getKeysInterpretationAtDestinationList$ = createSelector(interpretKeys$, subscriptions$, (interpretKeys, subscriptions) => {
	return ({ destination }: { destination: string }) => {
		let dataList: KeysInterpretationAtDestination[] = [];
		const destinationIsRoot = destination === '';
		if (destinationIsRoot) {
			dataList = Object.keys(subscriptions).reduce((subscriptionsKeyList, subscriptionsKey) => {
				const newRootKeysInterpretationAtDestinationList: KeysInterpretationAtDestination[] = findKeysInterpretationAtDestinationList({ destinationSegmentList: subscriptionsKey.split('/'), subscriptions, interpretKeys });
				//TODO: filter of includes, no other better way?
				return subscriptionsKeyList.concat(
					newRootKeysInterpretationAtDestinationList.filter((newRootKeys) => {
						return !subscriptionsKeyList.includes(newRootKeys);
					})
				);
			}, <KeysInterpretationAtDestination[]>[]);
		} else {
			dataList = findKeysInterpretationAtDestinationList({ destinationSegmentList: destination.split('/'), subscriptions, interpretKeys });
		}
		return dataList.length > 0 ? [{ ...dataList[0] }, ...dataList.slice(1)] : dataList;
	};
});
export const dataListIsEmpty$ = createSelector(getKeysInterpretationAtDestinationList$, (getKeysInterpretationAtDestinationList) => ({ destination }: { destination: string }) => getKeysInterpretationAtDestinationList({ destination }).length === 0);

export const docList$ = (destination: string) =>
	createSelector(documents$, keysList$(destination), (documents, keysList) =>
		getUniqueDocList(
			keysList
				.reduce((docList, { databaseConfigurationKey, changesOptionsKey }) => {
					const areDocReadytoBeReduced = Object.keys(documents).includes(databaseConfigurationKey) && Object.keys(documents[databaseConfigurationKey].changesFeeds).includes(changesOptionsKey);
					if (areDocReadytoBeReduced) {
						const isRegisterCompleteInfoNotReceivedYet = documents[databaseConfigurationKey].changesFeeds[changesOptionsKey].since0CompleteInfo === null;
						if (isRegisterCompleteInfoNotReceivedYet) {
							return docList.concat(
								documents[databaseConfigurationKey].changesFeeds[changesOptionsKey].liveSinceLastSeqChangeList
									.map(({ doc }) => doc)
									.reduce((_docList, doc) => {
										const indexOfDoc = _docList.map(({ _id }) => _id).indexOf(doc._id);
										const isDocNew = indexOfDoc === -1;
										if (isDocNew) {
											return [..._docList, doc];
										} else {
											return [..._docList.slice(0, indexOfDoc), doc, ..._docList.slice(indexOfDoc + 1)];
										}
									}, [])
							);
						} else {
							return docList.concat(
								documents[databaseConfigurationKey].changesFeeds[changesOptionsKey].liveSinceLastSeqChangeList
									.map(({ doc }) => doc)
									.reduce(
										(_docList, doc) => {
											const indexOfDoc = _docList.map(({ _id }) => _id).indexOf(doc._id);
											const isDocNew = indexOfDoc === -1;
											if (isDocNew) {
												return [..._docList, doc];
											} else {
												return [..._docList.slice(0, indexOfDoc), doc, ..._docList.slice(indexOfDoc + 1)];
											}
										},
										[...documents[databaseConfigurationKey].changesFeeds[changesOptionsKey].since0CompleteInfo.results.map(({ doc }) => doc)]
									) //TODO: remove ... ?
							);
						}
					} else {
						return docList;
					}
				}, [])
				.filter((doc) => !isDocArchived({ doc }))
		)
	);
//#endregion

export const Selectors = {
	changesFeedsSubscriptionsSubscribe$,
	documents$,
	interpretKeys$,
	isConnected$,
	subscriptions$,
	keysList$,
	getKeysInterpretationAtDestinationList$,
	dataListIsEmpty$,
	docList$
};
