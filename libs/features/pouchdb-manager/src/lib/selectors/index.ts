import { IndexedKeys } from '../actions/changes-feeds/subscriptions/exec.actions';
import { getFeatureState } from '../reducers';
import {
	Subscriptions,
	Sync
	} from '../reducers/changes-feeds/subscriptions/subscribe.reducer';
import { createSelector } from '@ngrx/store';

export const grabIndexedKeysList = ({ indexedKeysList, subscriptions }: { indexedKeysList: IndexedKeys[]; subscriptions: Subscriptions | IndexedKeys }): IndexedKeys[] => {
	const subscriptionsKeyList = Object.keys(subscriptions);
	const subscriptionsIsIndexedKeys = subscriptionsKeyList.filter((key) => key === 'databaseConfigurationKey' || key === 'changesOptionsKey').length === 2;
	if (subscriptionsIsIndexedKeys) {
		return indexedKeysList.concat([<IndexedKeys>subscriptions]);
	} else {
		return subscriptionsKeyList.reduce((_indexedKeysList, subscriptionsKey) => _indexedKeysList.concat(grabIndexedKeysList({ indexedKeysList, subscriptions: subscriptions[subscriptionsKey] })), <IndexedKeys[]>[]);
	}
};

export const findIndexedKeyList = ({ destinationSegmentList, subscriptions }: { destinationSegmentList: string[]; subscriptions: Subscriptions }) => {
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

	return grabIndexedKeysList({ indexedKeysList: [], subscriptions: currentSubscriptions });
};

//#region changesFeeds
export const changesFeedsSubscriptionsSubscribe$ = createSelector(getFeatureState, ({ changesFeedsSubscriptionsSubscribe }) => changesFeedsSubscriptionsSubscribe);
export const changesFeedsSubscriptionsSubscribeDatabases$ = createSelector(changesFeedsSubscriptionsSubscribe$, ({ databases }) => databases);
export const changesFeedsSubscriptionsSubscribeSubscriptions$ = createSelector(changesFeedsSubscriptionsSubscribe$, ({ subscriptions }) => subscriptions);
export const changesFeedsSubscriptionsSubscribeIndexedKeysListsByDestination$ = (destinationList: string[]) =>
	createSelector(changesFeedsSubscriptionsSubscribeSubscriptions$, (subscriptions) =>
		destinationList.reduce((indexedKeysListsByDestination, destination) => {
			indexedKeysListsByDestination[destination] = findIndexedKeyList({ destinationSegmentList: destination.split('/'), subscriptions });
			return indexedKeysListsByDestination;
		}, <{ [destination: string]: IndexedKeys[] }>{})
	);
export const changesFeedsSubscriptionsSubscribeIndexedKeysList$ = (destinationList: string[]) => createSelector(changesFeedsSubscriptionsSubscribeIndexedKeysListsByDestination$(destinationList), (indexedKeysListsByDestination) => destinationList.reduce((indexedKeysList, destination) => indexedKeysList.concat(indexedKeysListsByDestination[destination]), <IndexedKeys[]>[]));
export const changesFeedsCompleteInfoListsByDestination$ = <T>(destinationList: string[]) =>
	createSelector(changesFeedsSubscriptionsSubscribeDatabases$, changesFeedsSubscriptionsSubscribeIndexedKeysListsByDestination$(destinationList), (databases, indexedKeysListsByDestination) =>
		destinationList.reduce((completeInfoListsByDestination, destination) => {
			completeInfoListsByDestination[destination] = indexedKeysListsByDestination[destination].reduce(
				(completeInfoList, indexedKeys) =>
					completeInfoList.concat(
						Object.keys(databases).includes(indexedKeys.databaseConfigurationKey) && Object.keys(databases[indexedKeys.databaseConfigurationKey].changesFeeds).includes(indexedKeys.changesOptionsKey) && databases[indexedKeys.databaseConfigurationKey].changesFeeds[indexedKeys.changesOptionsKey].completeInfo !== null
							? [<PouchDB.Core.ChangesResponse<T>>databases[indexedKeys.databaseConfigurationKey].changesFeeds[indexedKeys.changesOptionsKey].completeInfo]
							: []
					),
				[]
			);
			return completeInfoListsByDestination;
		}, <{ [destination: string]: PouchDB.Core.ChangesResponse<T>[] }>{})
	);
export const changesFeedsCompleteInfoList$ = <T>(destinationList: string[]) => createSelector(changesFeedsCompleteInfoListsByDestination$<T>(destinationList), (completeInfoListsByDestination) => destinationList.reduce((completeInfoList, destination) => completeInfoList.concat(completeInfoListsByDestination[destination]), <PouchDB.Core.ChangesResponse<T>[]>[]));
export const changesFeedsCompleteInfoDocListsByDestination$ = <T>(destinationList: string[]) =>
	createSelector(changesFeedsSubscriptionsSubscribeDatabases$, changesFeedsCompleteInfoListsByDestination$(destinationList), (databases, completeInfoListsByDestination) =>
		destinationList.reduce((completeInfoDocListsByDestination, destination) => {
			completeInfoDocListsByDestination[destination] = completeInfoListsByDestination[destination].reduce((completeInfoDocList, completeInfo) => completeInfoDocList.concat(Object.keys(completeInfo).includes('results') ? completeInfo.results.map(({ doc }) => <PouchDB.Core.ExistingDocument<PouchDB.Core.ChangesMeta & T>>doc) : []), []);
			return completeInfoDocListsByDestination;
		}, <{ [destination: string]: PouchDB.Core.ExistingDocument<PouchDB.Core.ChangesMeta & T>[] }>{})
	);
export const changesFeedsCompleteInfoDocList$ = <T>(destinationList: string[]) =>
	createSelector(changesFeedsCompleteInfoDocListsByDestination$<T>(destinationList), (completeInfoDocListsByDestination) => destinationList.reduce((completeInfoDocList, destination) => completeInfoDocList.concat(completeInfoDocListsByDestination[destination]), <PouchDB.Core.ExistingDocument<PouchDB.Core.ChangesMeta & T>[]>[]));
export const changesFeedsCompleteInfoDocNotDeletedList$ = <T>(destinationList: string[]) => createSelector(changesFeedsCompleteInfoDocList$<T>(destinationList), (completeInfoDocList) => completeInfoDocList.filter(({ _deleted }) => _deleted === undefined || _deleted === false));

export const changesFeedsSyncListsByDestination$ = <T>(destinationList: string[]) =>
	createSelector(changesFeedsSubscriptionsSubscribeDatabases$, changesFeedsSubscriptionsSubscribeIndexedKeysListsByDestination$(destinationList), (databases, indexedKeysListsByDestination) =>
		destinationList.reduce((syncListsByDestination, destination) => {
			syncListsByDestination[destination] = indexedKeysListsByDestination[destination].reduce(
				(syncList, indexedKeys) =>
					syncList.concat(
						Object.keys(databases).includes(indexedKeys.databaseConfigurationKey) &&
							Object.keys(databases[indexedKeys.databaseConfigurationKey].changesFeeds).includes(indexedKeys.changesOptionsKey) &&
							databases[indexedKeys.databaseConfigurationKey].changesFeeds[indexedKeys.changesOptionsKey].sync !== undefined &&
							databases[indexedKeys.databaseConfigurationKey].changesFeeds[indexedKeys.changesOptionsKey].sync !== null
							? [<Sync<T>>databases[indexedKeys.databaseConfigurationKey].changesFeeds[indexedKeys.changesOptionsKey].sync]
							: []
					),
				<Sync<T>[]>[]
			);
			return syncListsByDestination;
		}, <{ [destination: string]: Sync<T>[] }>{})
	);
export const changesFeedsSyncChangeList$ = <T>(destinationList: string[]) =>
	createSelector(changesFeedsSyncListsByDestination$<T>(destinationList), (syncListsByDestination) => destinationList.reduce((syncList, destination) => syncList.concat(syncListsByDestination[destination]), <Sync<T>[]>[]).reduce((changeList, sync) => changeList.concat(sync.changeList), <PouchDB.Core.ChangesResponseChange<T>[]>[]));

export const changesFeedsDocList$ = <T>(destinationList: string[]) =>
	createSelector(changesFeedsCompleteInfoDocNotDeletedList$<T>(destinationList), changesFeedsSyncChangeList$<T>(destinationList), (completeInfoNotDeletedDocList, syncChangeList) => {
		console.log({ completeInfoNotDeletedDocList, syncChangeList });
		let syncDocList = [...completeInfoNotDeletedDocList];
		syncChangeList.forEach((change) => {
			console.log({ change });
			const indexOfDocInNotDeletedDocList = syncDocList.map(({ _id }) => _id).indexOf(change.doc._id);
			const changeIsDelete = Object.keys(change.doc).includes('_deleted') && change.deleted === true;
			if (changeIsDelete) {
				console.log({ changeIsDelete });
				if (indexOfDocInNotDeletedDocList > -1) {
					syncDocList = [...syncDocList.slice(0, indexOfDocInNotDeletedDocList), ...syncDocList.slice(indexOfDocInNotDeletedDocList + 1)];
				}
			} else {
				if (indexOfDocInNotDeletedDocList > -1) {
					syncDocList = [...syncDocList.slice(0, indexOfDocInNotDeletedDocList), change.doc, ...syncDocList.slice(indexOfDocInNotDeletedDocList + 1)];
				} else {
					syncDocList = [...syncDocList, change.doc];
				}
			}
		});
		return syncDocList;
	});

//#endregion

export const Selectors = {
	changesFeedsSubscriptionsSubscribe$,
	changesFeedsSubscriptionsSubscribeDatabases$,
	changesFeedsSubscriptionsSubscribeSubscriptions$,
	changesFeedsSubscriptionsSubscribeIndexedKeysListsByDestination$,
	changesFeedsSubscriptionsSubscribeIndexedKeysList$,
	changesFeedsCompleteInfoListsByDestination$,
	changesFeedsCompleteInfoList$,
	changesFeedsCompleteInfoDocListsByDestination$,
	changesFeedsCompleteInfoDocList$,
	changesFeedsCompleteInfoDocNotDeletedList$,
	changesFeedsSyncListsByDestination$,
	changesFeedsSyncChangeList$,
	changesFeedsDocList$
};
