import { Actions as FeatureActions } from '../actions';
import { indexName } from '../index.config';
import {
	ChangeDetectionStrategy,
	Component,
	OnInit
	} from '@angular/core';
import { Selectors as FeaturePouchdbManagerSelectors } from '@gdgtoulouse/features/pouchdb-manager';
import { Selectors as FeatureRouterSelectors } from '@gdgtoulouse/features/router';
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
	childRouteSelectSelectedId$ = this.store.pipe(select(FeatureRouterSelectors.nextSegment$(indexName.split('route-')[1])));

	keysList1$ = this.store.pipe(select(FeaturePouchdbManagerSelectors.keysList$(`route/sidenavs/start/menu`)));
	docList1$ = this.store.pipe(select(FeaturePouchdbManagerSelectors.docList$(`route/sidenavs/start/menu`)));

	keysList2$ = this.store.pipe(select(FeaturePouchdbManagerSelectors.keysList$(`route/sidenavs/start`)));
	docList2$ = this.store.pipe(select(FeaturePouchdbManagerSelectors.docList$(`route/sidenavs/start/toto`)));

	getKeysInterpretationAtDestinationList$ = this.store.pipe(select(FeaturePouchdbManagerSelectors.getKeysInterpretationAtDestinationList$));

	constructor(private store: Store<{}>) {}

	ngOnInit() {}

	socket() {
		// this.store.dispatch(
		// 	FeaturePouchdbManagerActions.ChangesFeeds.Subscriptions.Socket.subscribe({
		// 		request: {
		// 			destination: `route/sidenavs/start/menu`,
		// 			databaseConfiguration: {
		// 				auth: {
		// 					password: 'cloud',
		// 					username: 'cloud'
		// 				},
		// 				name: 'http://localhost:5000/menu-default'
		// 			},
		// 			changesOptions: {
		// 				selector: { $and: [{ $or: [{ pid: { $eq: 'projects-com-gpio-configs' } }, { pid: { $eq: 'projects-com-gpio-executions' } }] }] }
		// 			}
		// 		}
		// 	})
		// );
		// this.store.dispatch(
		// 	FeaturePouchdbManagerActions.ChangesFeeds.Subscriptions.Socket.subscribe({
		// 		request: {
		// 			destination: `route/sidenavs/start/toto`,
		// 			databaseConfiguration: {
		// 				auth: {
		// 					password: 'cloud',
		// 					username: 'cloud'
		// 				},
		// 				name: 'http://localhost:5000/menu-default'
		// 			},
		// 			changesOptions: {
		// 				selector: { $and: [{ $or: [{ pid: { $eq: 'projects-com-gpio-configs' } }] }] }
		// 			}
		// 		}
		// 	})
		// );
	}

	exec() {}

	sync() {}

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
