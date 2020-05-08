import { getFeatureState } from '../reducers';
import { createSelector } from '@ngrx/store';

//#region changesFeeds
export const changesFeedsSubscriptionsExec$ = createSelector(getFeatureState, ({ changesFeedsSubscriptionsExec }) => changesFeedsSubscriptionsExec);
export const changesFeedsSubscriptionsExecDatabases$ = createSelector(changesFeedsSubscriptionsExec$, ({ databases }) => databases);
export const changesFeedsSubscriptionsExecSubscriptions$ = createSelector(changesFeedsSubscriptionsExec$, ({ subscriptions }) => subscriptions);
export const changesFeedsSubscriptionsExecSubscription$ = (subscriber: string) => createSelector(changesFeedsSubscriptionsExecSubscriptions$, (subscriptions) => (Object.keys(subscriptions).includes(subscriber) ? subscriptions[subscriber] : undefined));
export const changesFeedsCompleteInfoBySubscription$ = (subscriber: string) =>
	createSelector(changesFeedsSubscriptionsExecDatabases$, changesFeedsSubscriptionsExecSubscription$(subscriber), (databases, subscription) =>
		subscription === undefined || !Object.keys(databases).includes(subscription.databaseConfigurationKey) || !Object.keys(databases[subscription.databaseConfigurationKey].changesFeeds).includes(subscription.changesOptionsKey) ? undefined : databases[subscription.databaseConfigurationKey].changesFeeds[subscription.changesOptionsKey].completeInfo
	);
export const docsOfCompleteInfoBySubscription$ = (subscriber: string) => createSelector(changesFeedsCompleteInfoBySubscription$(subscriber), (changesFeed) => (changesFeed === undefined || changesFeed === null ? undefined : changesFeed.results.map(({ doc }) => doc)));
//#endregion

export const Selectors = {
	changesFeedsCompleteInfoBySubscription$,
	docsOfCompleteInfoBySubscription$
};
