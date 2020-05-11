import { getFeatureState } from '../reducers';
import { createSelector } from '@ngrx/store';

//#region changesFeeds
export const changesFeedsSubscriptionsSubscribe$ = createSelector(getFeatureState, ({ changesFeedsSubscriptionsSubscribe }) => changesFeedsSubscriptionsSubscribe);
export const changesFeedsSubscriptionsSubscribeDatabases$ = createSelector(changesFeedsSubscriptionsSubscribe$, ({ databases }) => databases);
export const changesFeedsSubscriptionsSubscribeSubscriptions$ = createSelector(changesFeedsSubscriptionsSubscribe$, ({ subscriptions }) => subscriptions);
export const changesFeedsSubscriptionsSubscribeSubscription$ = (subscriber: string) => createSelector(changesFeedsSubscriptionsSubscribeSubscriptions$, (subscriptions) => (Object.keys(subscriptions).includes(subscriber) ? subscriptions[subscriber] : undefined));
export const changesFeedsCompleteInfoBySubscription$ = (subscriber: string) =>
	createSelector(changesFeedsSubscriptionsSubscribeDatabases$, changesFeedsSubscriptionsSubscribeSubscription$(subscriber), (databases, subscription) =>
		subscription === undefined || !Object.keys(databases).includes(subscription.databaseConfigurationKey) || !Object.keys(databases[subscription.databaseConfigurationKey].changesFeeds).includes(subscription.changesOptionsKey) ? undefined : databases[subscription.databaseConfigurationKey].changesFeeds[subscription.changesOptionsKey].completeInfo
	);
export const changesFeedsCompleteInfoResultsDocListBySubscription$ = (subscriber: string) => createSelector(changesFeedsCompleteInfoBySubscription$(subscriber), (changesFeed) => (changesFeed === undefined || changesFeed === null ? [] : changesFeed.results.map(({ doc }) => doc)));
export const changesFeedsCompleteInfoResultsNotDeletedDocListBySubscription$ = (subscriber: string) => createSelector(changesFeedsCompleteInfoResultsDocListBySubscription$(subscriber), (docList) => docList.filter(({ _deleted }) => _deleted === undefined || _deleted === false));
export const changesFeedsSyncBySubscription$ = (subscriber: string) =>
	createSelector(changesFeedsSubscriptionsSubscribeDatabases$, changesFeedsSubscriptionsSubscribeSubscription$(subscriber), (databases, subscription) =>
		subscription === undefined || !Object.keys(databases).includes(subscription.databaseConfigurationKey) || !Object.keys(databases[subscription.databaseConfigurationKey].changesFeeds).includes(subscription.changesOptionsKey) || !Object.keys(databases[subscription.databaseConfigurationKey].changesFeeds[subscription.changesOptionsKey]).includes('sync')
			? undefined
			: databases[subscription.databaseConfigurationKey].changesFeeds[subscription.changesOptionsKey].sync
	);
export const changesFeedsSyncChangeListBySubscription$ = (subscriber: string) => createSelector(changesFeedsSyncBySubscription$(subscriber), (sync) => (sync === undefined ? [] : sync.changeList));
export const changesFeedsSyncDocListBySubscription$ = (subscriber: string) =>
	createSelector(changesFeedsCompleteInfoResultsNotDeletedDocListBySubscription$(subscriber), changesFeedsSyncChangeListBySubscription$(subscriber), (notDeletedDocList, changeList) => {
		let syncChangeList = [...notDeletedDocList];
		changeList.forEach((change) => {
			const indexOfDocInNotDeletedDocList = notDeletedDocList.map(({ _id }) => _id).indexOf(change.doc._id);
			const changeIsDelete = Object.keys(change.doc).includes('_deleted') && change.deleted === true;
			if (changeIsDelete) {
				if (indexOfDocInNotDeletedDocList > -1) {
					syncChangeList = [...syncChangeList.slice(0, indexOfDocInNotDeletedDocList), ...syncChangeList.slice(indexOfDocInNotDeletedDocList + 1)];
				}
			} else {
				if (indexOfDocInNotDeletedDocList > -1) {
					syncChangeList = [...syncChangeList.slice(0, indexOfDocInNotDeletedDocList), change.doc, ...syncChangeList.slice(indexOfDocInNotDeletedDocList + 1)];
				} else {
					syncChangeList = [...syncChangeList, change.doc];
				}
			}
		});
		return syncChangeList;
	});

//#endregion

export const Selectors = {
	changesFeedsSubscriptionsSubscribe$,
	changesFeedsSubscriptionsSubscribeDatabases$,
	changesFeedsSubscriptionsSubscribeSubscriptions$,
	changesFeedsSubscriptionsSubscribeSubscription$,
	changesFeedsCompleteInfoBySubscription$,
	changesFeedsCompleteInfoResultsDocListBySubscription$,
	changesFeedsCompleteInfoResultsNotDeletedDocListBySubscription$,
	changesFeedsSyncBySubscription$,
	changesFeedsSyncChangeListBySubscription$,
	changesFeedsSyncDocListBySubscription$
};
