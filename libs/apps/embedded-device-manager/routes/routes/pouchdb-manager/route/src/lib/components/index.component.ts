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
export const selector = 'gdgtoulouse-libs-components-apps-embedded-device-manager-routes-routes-terminal-route-index-c';
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

	testExecSubscriberKey = `${selector}_local-hardware-menu_exec`;
	testExec$ = this.store.pipe(select(PouchdbManagerFeatureSelectors.docNotDeletedListOfCompleteInfoBySubscription$(this.testExecSubscriberKey)));

	testSyncSubscriberKey = `${selector}_local-hardware-menu_sync`;
	testSync$ = this.store.pipe(select(PouchdbManagerFeatureSelectors.docNotDeletedListOfCompleteInfoBySubscription$(this.testSyncSubscriberKey)));

	constructor(private store: Store<{}>) {}

	ngOnInit() {}

	exec() {
		this.store.dispatch(
			PouchdbManagerFeatureActions.ChangesFeeds.Subscriptions.Exec.request({
				subscriber: this.testExecSubscriberKey,
				databaseConfiguration: {
					name: 'http://localhost:5000/local-hardware-menu'
				},
				changesOptions: {
					since: 0,
					include_docs: true
				}
			})
		);
	}

	sync() {
		this.store.dispatch(
			PouchdbManagerFeatureActions.ChangesFeeds.Subscriptions.Sync.request({
				subscriber: this.testSyncSubscriberKey,
				databaseConfiguration: {
					name: 'http://localhost:5000/local-hardware-menu'
				},
				changesOptions: {
					include_docs: true
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
