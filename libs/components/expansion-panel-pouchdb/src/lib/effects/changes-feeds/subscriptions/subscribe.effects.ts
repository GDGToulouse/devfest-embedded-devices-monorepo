import { Actions as FeatureActions } from '../../../actions';
import { Injectable } from '@angular/core';
import {
	Actions as PouchdbManagerActions,
	NotificationConfig as PouchdbManagerNotificationConfig
	} from '@gdgtoulouse/features/pouchdb-manager';
import {
	Actions,
	createEffect,
	ofType
	} from '@ngrx/effects';
import { Store } from '@ngrx/store';
import Pouchdb from 'pouchdb';
import {
	combineLatest,
	of
	} from 'rxjs';
import {
	delay,
	switchMap
	} from 'rxjs/operators';

// useless except to prevent the import removal from vscode organize imports extension
type PouchdbType = typeof Pouchdb;

export const topic = 'changes-feeds-subscriptions-subscribe';

@Injectable()
export class Effects {
	nullTreeList$ = createEffect(
		() =>
			combineLatest([this.actions$.pipe(ofType(FeatureActions.Pouchdb.Init.SyncNullTreeList.exec))]).pipe(
				// tap(() => this.store.dispatch(ProcessingsActions.add({ label: `[${indexName}][${topic}] main$` }))),
				delay(20),
				switchMap(([{ langSubscriptionConfig, subscriptionConfig }]) => {
					const isSelectorSpecified = Object.keys(<PouchDB.Core.ChangesOptions>subscriptionConfig.changesOptions).includes('selector');
					const isSelectorAndSpecified = isSelectorSpecified && Object.keys((<PouchDB.Core.ChangesOptions>subscriptionConfig.changesOptions).selector).includes('$and');
					const selectorAndConditionList = isSelectorAndSpecified ? [...(<PouchDB.Core.ChangesOptions>subscriptionConfig.changesOptions).selector.$and, { pid: { $eq: null } }] : [{ pid: { $eq: null } }];
					return of(
						PouchdbManagerActions.ChangesFeeds.Subscriptions.Sync.subscribe({
							subscriptionConfig: {
								...subscriptionConfig,
								destinationList: subscriptionConfig.destinationList.map((destination) => `${destination}/null`),
								changesOptions: {
									...(<PouchDB.Core.ChangesOptions>subscriptionConfig.changesOptions),
									selector: isSelectorSpecified
										? {
												...(<PouchDB.Core.ChangesOptions>subscriptionConfig.changesOptions).selector,
												$and: selectorAndConditionList
										  }
										: {
												$and: selectorAndConditionList
										  }
								},
								notifications: {
									changeList: [
										({ notificationConfig }: { notificationConfig: PouchdbManagerNotificationConfig }) => {
											const changeIsDelete = Object.keys(notificationConfig.since0Change.doc).includes('_deleted') && notificationConfig.since0Change.deleted === true;
											if (changeIsDelete) {
												//TODO dispatch action to remove destinationList from databaseConfiguration,changesOptions
												return [{ type: 'todo' }];
											} else {
												return [/*FeatureActions.Pouchdb.Init.SyncLangChild.exec({ langSubscriptionConfig, notificationConfig, subscriptionConfig }), */ FeatureActions.Pouchdb.Init.SyncNullChildTreeList.exec({ langSubscriptionConfig, notificationConfig, subscriptionConfig })];
											}
										}
									]
								}
							}
						})
					);
				})
				// tap(() => this.store.dispatch(ProcessingsActions.remove({ label: `[${indexName}][${topic}] exec$` })))
			),
		{ dispatch: true }
	);

	langChild$ = createEffect(
		() =>
			combineLatest([this.actions$.pipe(ofType(FeatureActions.Pouchdb.Init.SyncLangChild.exec))]).pipe(
				// tap(() => this.store.dispatch(ProcessingsActions.add({ label: `[${indexName}][${topic}] main$` }))),
				delay(20),
				switchMap(([{ langSubscriptionConfig, notificationConfig, subscriptionConfig }]) => {
					const isSelectorSpecified = Object.keys(<PouchDB.Core.ChangesOptions>langSubscriptionConfig.changesOptions).includes('selector');
					const isSelectorAndSpecified = isSelectorSpecified && Object.keys((<PouchDB.Core.ChangesOptions>langSubscriptionConfig.changesOptions).selector).includes('$and');
					const selectorAndConditionList = isSelectorAndSpecified ? [...(<PouchDB.Core.ChangesOptions>langSubscriptionConfig.changesOptions).selector.$and, { _id: { $eq: notificationConfig.since0Change.doc._id } }] : [{ _id: { $eq: notificationConfig.since0Change.doc._id } }];
					return of(
						PouchdbManagerActions.ChangesFeeds.Subscriptions.Sync.subscribe({
							subscriptionConfig: {
								...langSubscriptionConfig,
								destinationList: langSubscriptionConfig.destinationList.map((destination) => `${destination}/${notificationConfig.since0Change.doc._id}`),
								changesOptions: {
									...(<PouchDB.Core.ChangesOptions>langSubscriptionConfig.changesOptions),
									selector: isSelectorSpecified
										? {
												...(<PouchDB.Core.ChangesOptions>langSubscriptionConfig.changesOptions).selector,
												$and: selectorAndConditionList
										  }
										: {
												$and: selectorAndConditionList
										  }
								}
							}
						})
					);
				})
				// tap(() => this.store.dispatch(ProcessingsActions.remove({ label: `[${indexName}][${topic}] exec$` })))
			),
		{ dispatch: true }
	);

	nullChildTreeList$ = createEffect(
		() =>
			combineLatest([this.actions$.pipe(ofType(FeatureActions.Pouchdb.Init.SyncNullChildTreeList.exec))]).pipe(
				// tap(() => this.store.dispatch(ProcessingsActions.add({ label: `[${indexName}][${topic}] main$` }))),
				delay(20),
				switchMap(([{ langSubscriptionConfig, notificationConfig, subscriptionConfig }]) => {
					const selectorAndConditionList = [...notificationConfig.changesOptionsAsNotString.selector.$and.slice(0, -1), { pid: { $eq: notificationConfig.since0Change.doc._id } }];
					return of(
						PouchdbManagerActions.ChangesFeeds.Subscriptions.Sync.subscribe({
							subscriptionConfig: {
								databaseConfiguration: notificationConfig.databaseConfigurationAsNotString,
								destinationList: notificationConfig.destinationList.map(
									(destination) =>
										`${destination
											.split('/')
											.slice(0, -1)
											.join('/')}/${notificationConfig.since0Change.doc._id}`
								),
								changesOptions: {
									...notificationConfig.changesOptionsAsNotString,
									selector: {
										...notificationConfig.changesOptionsAsNotString.selector,
										$and: selectorAndConditionList
									}
								},
								notifications: {
									changeList: [
										({ notificationConfig: _notificationConfig }: { notificationConfig: PouchdbManagerNotificationConfig }) => {
											const changeIsDelete = Object.keys(_notificationConfig.since0Change.doc).includes('_deleted') && _notificationConfig.since0Change.deleted === true;
											if (changeIsDelete) {
												//TODO dispatch action to remove destinationList from databaseConfiguration,changesOptions
												return [{ type: 'todo' }];
											} else {
												return [
													{ type: 'todo' }
													/*FeatureActions.Pouchdb.Init.SyncLangChild.exec({ langSubscriptionConfig, notificationConfig: _notificationConfig, subscriptionConfig })*/
												];
											}
										}
									]
								}
							}
						})
					);
				})
				// tap(() => this.store.dispatch(ProcessingsActions.remove({ label: `[${indexName}][${topic}] exec$` })))
			),
		{ dispatch: true }
	);

	opened$ = createEffect(
		() =>
			combineLatest([this.actions$.pipe(ofType(FeatureActions.Ui.ExpansionPanel.Opened.exec))]).pipe(
				// tap(() => this.store.dispatch(ProcessingsActions.add({ label: `[${indexName}][${topic}] main$` }))),
				delay(20),
				switchMap(([{ subscriptionConfig, tree }]) => {
					const isSelectorSpecified = Object.keys(<PouchDB.Core.ChangesOptions>subscriptionConfig.changesOptions).includes('selector');
					const isSelectorAndSpecified = isSelectorSpecified && Object.keys((<PouchDB.Core.ChangesOptions>subscriptionConfig.changesOptions).selector).includes('$and');
					const treeListSelectorCondition = { $or: Object.keys(tree).includes('treeList') ? tree.treeList.filter((subtree) => !Object.keys(subtree).includes('router')).map(({ _id }) => ({ pid: { $eq: _id } })) : [] };
					const selectorAndConditionList = isSelectorAndSpecified ? [...(<PouchDB.Core.ChangesOptions>subscriptionConfig.changesOptions).selector.$and, treeListSelectorCondition] : [treeListSelectorCondition];
					const needNewSubscription = treeListSelectorCondition.$or.length !== 0;
					if (needNewSubscription) {
						return of(
							PouchdbManagerActions.ChangesFeeds.Subscriptions.Sync.subscribe({
								subscriptionConfig: {
									...subscriptionConfig,
									destinationList: subscriptionConfig.destinationList.map((destination) => `${destination}/${tree._id}-treeList`),
									changesOptions: {
										...(<PouchDB.Core.ChangesOptions>subscriptionConfig.changesOptions),
										selector: isSelectorSpecified
											? {
													...(<PouchDB.Core.ChangesOptions>subscriptionConfig.changesOptions).selector,
													$and: selectorAndConditionList
											  }
											: {
													$and: selectorAndConditionList
											  }
									}
								}
							})
						);
					} else {
						return of({ type: 'noop' });
					}
				})
				// tap(() => this.store.dispatch(ProcessingsActions.remove({ label: `[${indexName}][${topic}] exec$` })))
			),
		{ dispatch: true }
	);

	constructor(private actions$: Actions, private store: Store<{}>) {}
}
