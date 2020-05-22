import { Actions as FeatureActions } from '../../../actions';
import { indexName } from '../../../index.config';
import { Injectable } from '@angular/core';
import {
	Actions as PouchdbManagerActions,
	NotificationConfig as PouchdbManagerNotificationConfig
	} from '@gdgtoulouse/features/pouchdb-manager';
import { Actions as ProcessingsActions } from '@gdgtoulouse/features/processings';
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
	switchMap,
	tap
	} from 'rxjs/operators';

// useless except to prevent the import removal from vscode organize imports extension
type PouchdbType = typeof Pouchdb;

export const topic = 'changes-feeds-subscriptions-subscribe';

@Injectable()
export class Effects {
	nullTreeList$ = createEffect(
		() =>
			combineLatest([this.actions$.pipe(ofType(FeatureActions.Pouchdb.Init.SyncNullTreeList.exec))]).pipe(
				tap(() => this.store.dispatch(ProcessingsActions.add({ label: `[${indexName}][${topic}] main$` }))),
				delay(20),
				switchMap(([{ subscriptionConfig }]) => {
					const isSelectorSpecified = Object.keys(<PouchDB.Core.ChangesOptions>subscriptionConfig.changesOptions).includes('selector');
					const isSelectorAndSpecified = isSelectorSpecified && Object.keys((<PouchDB.Core.ChangesOptions>subscriptionConfig.changesOptions).selector).includes('$and');
					const selectorAndConditionList = isSelectorAndSpecified ? [...(<PouchDB.Core.ChangesOptions>subscriptionConfig.changesOptions).selector.$and, { pid: { $eq: null } }] : [{ pid: { $eq: null } }];
					return of(
						PouchdbManagerActions.ChangesFeeds.Subscriptions.Sync.subscribe({
							subscriptionConfig: {
								...subscriptionConfig,
								destinationList: subscriptionConfig.destinationList.map((destination) => `${destination}/nullTreeList`),
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
									change: ({ notificationConfig }: { notificationConfig: PouchdbManagerNotificationConfig }) => {
										const changeIsDelete = Object.keys(notificationConfig.change.doc).includes('_deleted') && notificationConfig.change.deleted === true;
										if (changeIsDelete) {
											//TODO dispatch action to remove destinationList from databaseConfiguration,changesOptions
											return { type: 'todo' };
										} else {
											return FeatureActions.Pouchdb.Init.SyncNullTreeListTreeList.exec({ notificationConfig });
										}
									}
								}
							}
						})
					);
				}),
				tap(() => this.store.dispatch(ProcessingsActions.remove({ label: `[${indexName}][${topic}] exec$` })))
			),
		{ dispatch: true }
	);

	nullTreeListTreeList$ = createEffect(
		() =>
			combineLatest([this.actions$.pipe(ofType(FeatureActions.Pouchdb.Init.SyncNullTreeListTreeList.exec))]).pipe(
				tap(() => this.store.dispatch(ProcessingsActions.add({ label: `[${indexName}][${topic}] main$` }))),
				delay(20),
				switchMap(([{ notificationConfig }]) => {
					const selectorAndConditionList = [...notificationConfig.changesOptionsAsNotString.selector.$and.slice(0, -1), { pid: { $eq: notificationConfig.change.doc._id } }];
					return of(
						PouchdbManagerActions.ChangesFeeds.Subscriptions.Sync.subscribe({
							subscriptionConfig: {
								databaseConfiguration: notificationConfig.databaseConfigurationAsNotString,
								destinationList: notificationConfig.destinationList.map(
									(destination) =>
										`${destination
											.split('/')
											.slice(0, -1)
											.join('/')}/nullTreeListTreeList-${notificationConfig.change.doc._id}`
								),
								changesOptions: {
									...notificationConfig.changesOptionsAsNotString,
									selector: {
										...notificationConfig.changesOptionsAsNotString.selector,
										$and: selectorAndConditionList
									}
								}
							}
						})
					);
				}),
				tap(() => this.store.dispatch(ProcessingsActions.remove({ label: `[${indexName}][${topic}] exec$` })))
			),
		{ dispatch: true }
	);

	opened$ = createEffect(
		() =>
			combineLatest([this.actions$.pipe(ofType(FeatureActions.Ui.ExpansionPanel.Opened.exec))]).pipe(
				tap(() => this.store.dispatch(ProcessingsActions.add({ label: `[${indexName}][${topic}] main$` }))),
				delay(20),
				switchMap(([{ subscriptionConfig, tree }]) => {
					const isSelectorSpecified = Object.keys(<PouchDB.Core.ChangesOptions>subscriptionConfig.changesOptions).includes('selector');
					const isSelectorAndSpecified = isSelectorSpecified && Object.keys((<PouchDB.Core.ChangesOptions>subscriptionConfig.changesOptions).selector).includes('$and');
					const selectorAndConditionList = isSelectorAndSpecified ? [...(<PouchDB.Core.ChangesOptions>subscriptionConfig.changesOptions).selector.$and, { $or: tree.treeList.map(({ _id }) => ({ pid: { $eq: _id } })) }] : [{ $or: tree.treeList.map(({ _id }) => ({ pid: { $eq: _id } })) }];
					return of(
						PouchdbManagerActions.ChangesFeeds.Subscriptions.Sync.subscribe({
							subscriptionConfig: Object.keys(tree).includes('treeList')
								? { ...subscriptionConfig }
								: {
										...subscriptionConfig,
										destinationList: subscriptionConfig.destinationList.map(
											(destination) =>
												`${destination
													.split('/')
													.slice(0, -1)
													.join('/')}/nullTreeListTreeList-${tree._id}`
										),
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
				}),
				tap(() => this.store.dispatch(ProcessingsActions.remove({ label: `[${indexName}][${topic}] exec$` })))
			),
		{ dispatch: true }
	);

	constructor(private actions$: Actions, private store: Store<{}>) {}
}
