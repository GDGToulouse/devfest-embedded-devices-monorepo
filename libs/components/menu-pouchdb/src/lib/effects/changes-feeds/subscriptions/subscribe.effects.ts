import { Actions as FeatureActions } from '../../../actions';
import { Injectable } from '@angular/core';
import {
	Actions as PouchdbManagerActions,
	Destination,
	Listeners
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
				// tap(() => this.store.dispatch(ProcessingsActions.Processings.Add.exec({ label: `[${indexName}][${topic}] main$` }))),
				delay(20),
				switchMap(([{ langSubscribeRequest, subscribeRequest }]) => {
					const isChangesOptionsSpecified = Object.keys(subscribeRequest).includes('changesOptions');
					const isSelectorSpecified = isChangesOptionsSpecified && Object.keys(subscribeRequest.changesOptions).includes('selector');
					const isSelectorAndSpecified = isSelectorSpecified && Object.keys(subscribeRequest.changesOptions.selector).includes('$and');
					const selectorAndConditionList = isSelectorAndSpecified ? [...subscribeRequest.changesOptions.selector.$and, { pid: { $eq: null } }] : [{ pid: { $eq: null } }];
					return of(
						PouchdbManagerActions.ChangesFeeds.Subscriptions.Socket.subscribe({
							request: {
								...subscribeRequest,
								destination: this.nullChildrenDestination({ destination: subscribeRequest.destination }),
								changesOptions: {
									...subscribeRequest.changesOptions,
									selector: isSelectorSpecified
										? {
												...subscribeRequest.changesOptions.selector,
												$and: selectorAndConditionList
										  }
										: {
												$and: selectorAndConditionList
										  }
								},
								listeners: {
									since0Change: (since0EmitsChange) => [FeatureActions.Pouchdb.Init.SyncLangChild.exec({ destination: subscribeRequest.destination, langSubscribeRequest, subscribeRequest, since0EmitsChange }), FeatureActions.Pouchdb.Init.SyncNullChildTreeList.exec({ destination: subscribeRequest.destination, langSubscribeRequest, subscribeRequest, since0EmitsChange })]
								}
							}
						})
					);
				})
				// tap(() => this.store.dispatch(ProcessingsActions.Processings.Remove.exec({ label: `[${indexName}][${topic}] exec$` })))
			),
		{ dispatch: true }
	);

	langChild$ = createEffect(
		() =>
			combineLatest([this.actions$.pipe(ofType(FeatureActions.Pouchdb.Init.SyncLangChild.exec))]).pipe(
				// tap(() => this.store.dispatch(ProcessingsActions.Processings.Add.exec({ label: `[${indexName}][${topic}] main$` }))),
				delay(20),
				switchMap(
					([
						{
							destination,
							langSubscribeRequest,
							subscribeRequest,
							since0EmitsChange: {
								since0Change: {
									doc: { _id: childId }
								}
							}
						}
					]) => {
						const idEqChildIdCondition = { _id: { $eq: childId } };
						const changesOptionsIsDefined = Object.keys(langSubscribeRequest).includes('changesOptions');
						const newSubscriptionDestination = this.langChildrenDestination({ destination, childId });
						if (changesOptionsIsDefined) {
							const isSelectorSpecified = Object.keys(langSubscribeRequest.changesOptions).includes('selector');
							const isSelectorAndSpecified = isSelectorSpecified && Object.keys(langSubscribeRequest.changesOptions.selector).includes('$and');
							const selectorAndConditionList = isSelectorAndSpecified ? [...langSubscribeRequest.changesOptions.selector.$and, idEqChildIdCondition] : [idEqChildIdCondition];
							return of(
								PouchdbManagerActions.ChangesFeeds.Subscriptions.Socket.subscribe({
									request: {
										databaseConfiguration: langSubscribeRequest.databaseConfiguration,
										destination: newSubscriptionDestination,
										changesOptions: {
											...langSubscribeRequest.changesOptions,
											selector: isSelectorSpecified
												? {
														...langSubscribeRequest.changesOptions.selector,
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
							const selectorAndConditionList = [idEqChildIdCondition];
							return of(
								PouchdbManagerActions.ChangesFeeds.Subscriptions.Socket.subscribe({
									request: {
										databaseConfiguration: langSubscribeRequest.databaseConfiguration,
										destination: newSubscriptionDestination,
										changesOptions: {
											selector: {
												$and: selectorAndConditionList
											}
										}
									}
								})
							);
						}
					}
				)
				// tap(() => this.store.dispatch(ProcessingsActions.Processings.Remove.exec({ label: `[${indexName}][${topic}] exec$` })))
			),
		{ dispatch: true }
	);

	nullChildTreeList$ = createEffect(
		() =>
			combineLatest([this.actions$.pipe(ofType(FeatureActions.Pouchdb.Init.SyncNullChildTreeList.exec))]).pipe(
				// tap(() => this.store.dispatch(ProcessingsActions.Processings.Add.exec({ label: `[${indexName}][${topic}] main$` }))),
				delay(20),
				switchMap(
					([
						{
							subscribeRequest,
							langSubscribeRequest,
							since0EmitsChange: {
								since0Change: {
									doc: { _id: nullChildId }
								}
							},
							destination
						}
					]) => {
						const pidEqNullChildIdCondition = { pid: { $eq: nullChildId } };
						const newSubscriptionDestination = this.nullChildrenChildrenDestination({ destination, childId: nullChildId });
						const changesOptionsIsDefined = Object.keys(subscribeRequest).includes('changesOptions');
						if (changesOptionsIsDefined) {
							const selectorAndConditionList = [...subscribeRequest.changesOptions.selector.$and.slice(0, -1), pidEqNullChildIdCondition];
							return of(
								PouchdbManagerActions.ChangesFeeds.Subscriptions.Socket.subscribe({
									request: {
										databaseConfiguration: subscribeRequest.databaseConfiguration,
										destination: newSubscriptionDestination,
										changesOptions: {
											...subscribeRequest.changesOptions,
											selector: {
												...subscribeRequest.changesOptions.selector,
												$and: selectorAndConditionList
											}
										},
										listeners: {
											since0Change: (since0EmitsChange) => [FeatureActions.Pouchdb.Init.SyncLangChild.exec({ destination, langSubscribeRequest, subscribeRequest, since0EmitsChange })]
										}
									}
								})
							);
						} else {
							const selectorAndConditionList = [pidEqNullChildIdCondition];
							return of(
								PouchdbManagerActions.ChangesFeeds.Subscriptions.Socket.subscribe({
									request: {
										databaseConfiguration: subscribeRequest.databaseConfiguration,
										destination: newSubscriptionDestination,
										changesOptions: {
											selector: {
												$and: selectorAndConditionList
											}
										},
										listeners: {
											since0Change: (since0EmitsChange) => [FeatureActions.Pouchdb.Init.SyncLangChild.exec({ destination, langSubscribeRequest, subscribeRequest, since0EmitsChange })]
										}
									}
								})
							);
						}
					}
				)
				// tap(() => this.store.dispatch(ProcessingsActions.Processings.Remove.exec({ label: `[${indexName}][${topic}] exec$` })))
			),
		{ dispatch: true }
	);

	opened$ = createEffect(
		() =>
			combineLatest([this.actions$.pipe(ofType(FeatureActions.Ui.Menu.Opened.exec))]).pipe(
				// tap(() => this.store.dispatch(ProcessingsActions.Processings.Add.exec({ label: `[${indexName}][${topic}] main$` }))),
				delay(20),
				switchMap(([{ langSubscribeRequest, subscribeRequest, tree }]) => {
					const treeListSelectorCondition = { $or: Object.keys(tree).includes('treeList') ? tree.treeList.filter((subtree) => !Object.keys(subtree).includes('router')).map(({ _id }) => ({ pid: { $eq: _id } })) : [] };
					const needNewSubscription = treeListSelectorCondition.$or.length !== 0;
					const newSubscriptionDestination = this.newSubscriptionDestination({ destination: subscribeRequest.destination, childId: tree._id });
					const changesOptionsIsDefined = Object.keys(subscribeRequest).includes('changesOptions');
					const listeners: Listeners = {
						since0Change: (since0EmitsChange) => {
							return [FeatureActions.Pouchdb.Init.SyncLangChild.exec({ destination: subscribeRequest.destination, langSubscribeRequest, subscribeRequest, since0EmitsChange })];
						}
					};
					if (changesOptionsIsDefined) {
						const isSelectorSpecified = Object.keys(subscribeRequest.changesOptions).includes('selector');
						const isSelectorAndSpecified = isSelectorSpecified && Object.keys(subscribeRequest.changesOptions.selector).includes('$and');
						const selectorAndConditionList = isSelectorAndSpecified ? [...subscribeRequest.changesOptions.selector.$and, treeListSelectorCondition] : [treeListSelectorCondition];
						if (needNewSubscription) {
							return of(
								PouchdbManagerActions.ChangesFeeds.Subscriptions.Socket.subscribe({
									request: {
										databaseConfiguration: subscribeRequest.databaseConfiguration,
										destination: newSubscriptionDestination,
										changesOptions: {
											...subscribeRequest.changesOptions,
											selector: {
												...subscribeRequest.changesOptions.selector,
												$and: selectorAndConditionList
											}
										},
										listeners
									}
								})
							);
						} else {
							return of({ type: 'todo' });
						}
					} else {
						const selectorAndConditionList = [treeListSelectorCondition];
						if (needNewSubscription) {
							return of(
								PouchdbManagerActions.ChangesFeeds.Subscriptions.Socket.subscribe({
									request: {
										databaseConfiguration: subscribeRequest.databaseConfiguration,
										destination: newSubscriptionDestination,
										changesOptions: {
											selector: {
												$and: selectorAndConditionList
											}
										},
										listeners
									}
								})
							);
							return of({ type: 'todo2' });
						} else {
							return of({ type: 'todo' });
						}
					}
					return of({ type: 'todo' });
				})
				// tap(() => this.store.dispatch(ProcessingsActions.Processings.Remove.exec({ label: `[${indexName}][${topic}] exec$` })))
			),
		{ dispatch: true }
	);

	constructor(private actions$: Actions, private store: Store<{}>) {}

	nullChildrenDestination({ destination }: Destination) {
		return `${destination}/null`;
	}
	langChildrenDestination({ destination, childId }: Destination & { childId: string }) {
		return `langs/${destination}/${childId}`;
	}
	nullChildrenChildrenDestination({ destination, childId }: Destination & { childId: string }) {
		return `${destination}/${childId}`;
	}
	newSubscriptionDestination({ destination, childId }: Destination & { childId: string }) {
		return `${destination}/${childId}-children`;
	}
}
