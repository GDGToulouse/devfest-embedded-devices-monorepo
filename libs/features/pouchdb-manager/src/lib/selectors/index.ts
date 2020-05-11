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
export const docsListCompleteInfoBySubscription$ = (subscriber: string) => createSelector(changesFeedsCompleteInfoBySubscription$(subscriber), (changesFeed) => (changesFeed === undefined || changesFeed === null ? undefined : changesFeed.results.map(({ doc }) => doc)));
export const docNotDeletedListOfCompleteInfoBySubscription$ = (subscriber: string) => createSelector(docsListCompleteInfoBySubscription$(subscriber), (docList) => (docList === undefined ? undefined : docList.filter(({ _deleted }) => _deleted === undefined || _deleted === false)));
//#endregion

export const Selectors = {
	changesFeedsCompleteInfoBySubscription$,
	docsListCompleteInfoBySubscription$,
	docNotDeletedListOfCompleteInfoBySubscription$
};
