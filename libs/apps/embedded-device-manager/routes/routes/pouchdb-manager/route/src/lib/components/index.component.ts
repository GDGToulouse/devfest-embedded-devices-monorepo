import { Actions as FeatureActions } from '../actions';
import { Selectors } from '../selectors';
import {
	ChangeDetectionStrategy,
	Component,
	OnInit
	} from '@angular/core';
import {
	Actions as PouchdbManagerFeatureActions,
	Selectors as PouchdbManagerFeatureSelectors
	} from '@gdgtoulouse/features/pouchdb-manager';
import {
	select,
	Store
	} from '@ngrx/store';
import { of } from 'rxjs';
// import { Selectors as FeatureSelectors } from '../selectors';
export const selector = 'gdgtoulouse-libs-components-apps-embedded-device-manager-routes-routes-pouchdb-manager-route-index';
@Component({
	selector,
	templateUrl: './index.component.html',
	styleUrls: ['./index.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class IndexComponent implements OnInit {
	childRouteSelectBindLabel$ = of('text');
	childRouteSelectBindValue$ = of('id');
	childRouteSelectItemList$ = of([
		{ id: 'changes-options', text: 'Changes configurations' },
		{ id: 'changes-feeds', text: 'Changes feeds' },
		{ id: 'database-configurations', text: 'Database configurations' },
		{ id: 'find-selectors', text: 'Find selectors' }
	]);
	childRouteSelectSelectedId$ = this.store.pipe(select(Selectors.currentChildSegment$));

	testExecDestinationList = [`${selector}/sidenavs/start/menu`];
	testExecSubscriptionsSubscribeIndexedKeysListsByDestination$ = this.store.pipe(select(PouchdbManagerFeatureSelectors.changesFeedsSubscriptionsSubscribeIndexedKeysListsByDestination$(this.testExecDestinationList)));
	testExecSubscriptionsSubscribeIndexedKeysList$ = this.store.pipe(select(PouchdbManagerFeatureSelectors.changesFeedsSubscriptionsSubscribeIndexedKeysList$(this.testExecDestinationList)));
	testExecCompleteInfoListsByDestination$ = this.store.pipe(select(PouchdbManagerFeatureSelectors.changesFeedsCompleteInfoListsByDestination$(this.testExecDestinationList)));
	testExecCompleteInfoList$ = this.store.pipe(select(PouchdbManagerFeatureSelectors.changesFeedsCompleteInfoList$(this.testExecDestinationList)));
	testExecCompleteInfoDocListsByDestination$ = this.store.pipe(select(PouchdbManagerFeatureSelectors.changesFeedsCompleteInfoDocListsByDestination$(this.testExecDestinationList)));
	testExecCompleteInfoDocList$ = this.store.pipe(select(PouchdbManagerFeatureSelectors.changesFeedsCompleteInfoDocList$(this.testExecDestinationList)));
	testExecCompleteInfoDocNotDeletedList$ = this.store.pipe(select(PouchdbManagerFeatureSelectors.changesFeedsCompleteInfoDocNotDeletedList$(this.testExecDestinationList)));
	testExecSyncListsByDestination$ = this.store.pipe(select(PouchdbManagerFeatureSelectors.changesFeedsSyncListsByDestination$(this.testExecDestinationList)));
	testExecSyncChangeList$ = this.store.pipe(select(PouchdbManagerFeatureSelectors.changesFeedsSyncChangeList$(this.testExecDestinationList)));
	testExecDocList$ = this.store.pipe(select(PouchdbManagerFeatureSelectors.changesFeedsDocList$(this.testExecDestinationList)));

	testSyncDestinationList = [`${selector}/sidenavs/start/menu`];
	testSyncSubscriptionsSubscribeIndexedKeysListsByDestination$ = this.store.pipe(select(PouchdbManagerFeatureSelectors.changesFeedsSubscriptionsSubscribeIndexedKeysListsByDestination$(this.testSyncDestinationList)));
	testSyncSubscriptionsSubscribeIndexedKeysList$ = this.store.pipe(select(PouchdbManagerFeatureSelectors.changesFeedsSubscriptionsSubscribeIndexedKeysList$(this.testSyncDestinationList)));
	testSyncCompleteInfoListsByDestination$ = this.store.pipe(select(PouchdbManagerFeatureSelectors.changesFeedsCompleteInfoListsByDestination$(this.testSyncDestinationList)));
	testSyncCompleteInfoList$ = this.store.pipe(select(PouchdbManagerFeatureSelectors.changesFeedsCompleteInfoList$(this.testSyncDestinationList)));
	testSyncCompleteInfoDocListsByDestination$ = this.store.pipe(select(PouchdbManagerFeatureSelectors.changesFeedsCompleteInfoDocListsByDestination$(this.testSyncDestinationList)));
	testSyncCompleteInfoDocList$ = this.store.pipe(select(PouchdbManagerFeatureSelectors.changesFeedsCompleteInfoDocList$(this.testSyncDestinationList)));
	testSyncCompleteInfoDocNotDeletedList$ = this.store.pipe(select(PouchdbManagerFeatureSelectors.changesFeedsCompleteInfoDocNotDeletedList$(this.testSyncDestinationList)));
	testSyncSyncListsByDestination$ = this.store.pipe(select(PouchdbManagerFeatureSelectors.changesFeedsSyncListsByDestination$(this.testSyncDestinationList)));
	testSyncSyncChangeList$ = this.store.pipe(select(PouchdbManagerFeatureSelectors.changesFeedsSyncChangeList$(this.testSyncDestinationList)));
	testSyncDocList$ = this.store.pipe(select(PouchdbManagerFeatureSelectors.changesFeedsDocList$(this.testSyncDestinationList)));

	constructor(private store: Store<{}>) {}

	ngOnInit() {}

	exec() {
		this.store.dispatch(
			PouchdbManagerFeatureActions.ChangesFeeds.Subscriptions.Exec.subscribe({
				subscriptionConfig: {
					destinationList: this.testExecDestinationList,
					databaseConfiguration: {
						auth: {
							password: 'cloud',
							username: 'cloud'
						},
						name: 'http://localhost:5000/menu-default'
					},
					changesOptions: {
						since: 0,
						include_docs: true,
						selector: {
							$and: [
								{
									pid: {
										$eq: null
									}
								}
							]
						}
					}
				}
			})
		);
	}

	sync() {
		this.store.dispatch(
			PouchdbManagerFeatureActions.ChangesFeeds.Subscriptions.Sync.subscribe({
				subscriptionConfig: {
					destinationList: this.testSyncDestinationList,
					databaseConfiguration: {
						auth: {
							password: 'cloud',
							username: 'cloud'
						},
						name: 'http://localhost:5000/menu-default'
					},
					changesOptions: {
						include_docs: true,
						selector: {
							$and: [
								{
									pid: {
										$eq: null
									}
								}
							]
						}
					}
				}
			})
		);
	}

	//#region child-route-select
	// TODO type with ng-select change event type
	childRouteSelect_add(event) {
		this.store.dispatch(FeatureActions.Uis.ChildRouteSelect.NgSelect.add({ event }));
	}
	childRouteSelect_blur(event) {
		this.store.dispatch(FeatureActions.Uis.ChildRouteSelect.NgSelect.blur({ event }));
	}
	childRouteSelect_clear() {
		this.store.dispatch(FeatureActions.Uis.ChildRouteSelect.NgSelect.clear());
	}
	childRouteSelect_close() {
		this.store.dispatch(FeatureActions.Uis.ChildRouteSelect.NgSelect.close());
	}
	childRouteSelect_change(event) {
		this.store.dispatch(FeatureActions.Uis.ChildRouteSelect.NgSelect.change({ event }));
	}
	childRouteSelect_focus(event) {
		this.store.dispatch(FeatureActions.Uis.ChildRouteSelect.NgSelect.focus({ event }));
	}
	childRouteSelect_open() {
		this.store.dispatch(FeatureActions.Uis.ChildRouteSelect.NgSelect.open());
	}
	childRouteSelect_remove(event) {
		this.store.dispatch(FeatureActions.Uis.ChildRouteSelect.NgSelect.remove({ event }));
	}
	childRouteSelect_scrollToEnd(event) {
		this.store.dispatch(FeatureActions.Uis.ChildRouteSelect.NgSelect.scrollToEnd({ event }));
	}
	childRouteSelect_search(event) {
		this.store.dispatch(FeatureActions.Uis.ChildRouteSelect.NgSelect.search({ event }));
	}
	//#endregion
}
