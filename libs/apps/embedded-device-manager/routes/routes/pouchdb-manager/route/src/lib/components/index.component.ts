import { Actions as FeatureActions } from '../actions';
import { featureName } from '../feature.config';
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
@Component({
	selector: 'gdgtoulouse-libs-components-apps-embedded-device-manager-routes-routes-terminal-route-index-c',
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

	testExecSubscriberKey = `${featureName}-index_local-hardware-menu_exec`;
	testExec$ = this.store.pipe(select(PouchdbManagerFeatureSelectors.docsOfCompleteInfoBySubscription$(this.testExecSubscriberKey)));

	constructor(private store: Store<{}>) {}

	ngOnInit() {}

	exec() {
		this.store.dispatch(
			PouchdbManagerFeatureActions.ChangesFeeds.Subscriptions.Exec.subscribe({
				subscriber: this.testExecSubscriberKey,
				databaseConfiguration: {
					name: 'http://localhost:5984/local-hardware-menu'
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
			PouchdbManagerFeatureActions.ChangesFeeds.Subscriptions.Sync.subscribe({
				subscriber: `${featureName}-index_local-hardware-menu_sync`,
				databaseConfiguration: {
					name: 'http://localhost:5984/local-hardware-menu'
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
