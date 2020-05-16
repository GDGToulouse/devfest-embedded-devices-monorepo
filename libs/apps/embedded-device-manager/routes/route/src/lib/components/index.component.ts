import { Actions as FeatureActions } from '../actions';
import { Selectors as FeatureSelectors } from '../selectors';
import { MediaMatcher } from '@angular/cdk/layout';
import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	OnDestroy
	} from '@angular/core';
import { PouchdbCompleteChangesRequest } from '@gdgtoulouse/types';
import {
	select,
	Store
	} from '@ngrx/store';
import {
	Observable,
	of
	} from 'rxjs';

const selector = 'gdgtoulouse-libs-components-apps-embedded-device-manager-routes-route-index-c';

@Component({
	selector,
	templateUrl: './index.component.html',
	styleUrls: ['./index.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class IndexComponent implements OnDestroy {
	langMenuList$ = this.store.pipe(select(FeatureSelectors.langMenuList$));
	langMenuItem$ = this.store.pipe(select(FeatureSelectors.langMenuItem$));
	mobileQuery: MediaQueryList;
	menuEndTogglerTooltip$ = of({ ariaLabel: { text: 'Button that displays a tooltip when focused or hovered over' }, tooltip: { text: 'Info about the action' } });
	menuLangsTooltip$ = of({ ariaLabel: { text: 'Button that displays a tooltip when focused or hovered over' }, tooltip: { text: 'Info about the action' } });
	menuEndTree$ = this.store.pipe(select(FeatureSelectors.menuEndTree$));
	sidenavEndIsOpen$ = this.store.pipe(select(FeatureSelectors.sidenavEndIsOpen$));
	sidenavEndTogglerTooltip$ = of({ ariaLabel: { text: 'Button that displays a tooltip when focused or hovered over' }, tooltip: { text: 'Info about the action' } });
	sidenavStartIsOpen$ = this.store.pipe(select(FeatureSelectors.sidenavStartIsOpen$));
	sidenavStartTogglerTooltip$ = of({ ariaLabel: { text: 'Button that displays a tooltip when focused or hovered over' }, tooltip: { text: 'Info about the action' } });
	leftSidenavItemList$ = of([{ label: { text: 'menu left item1 in lang1', routerLink: '.' } }, { label: { text: 'menu left item2 in lang1', routerLink: '.' } }, { label: { text: 'menu left item3 in lang1', routerLink: '.' } }]);
	rightSidenavItemList$ = of([{ label: { text: 'menu right item1 in lang1', routerLink: '.' } }, { label: { text: 'menu right item2 in lang1', routerLink: '.' } }, { label: { text: 'menu right item3 in lang1', routerLink: '.' } }]);
	title$ = of({ text: 'Responsive app lang1' });
	changesRequest$: Observable<PouchdbCompleteChangesRequest> = of({
		subscriber: `${selector}_default_menu_sync`,
		databaseConfiguration: {
			auth: {
				password: 'cloud',
				username: 'cloud'
			},
			name: 'http://localhost:5000/menu-default'
		},
		changesOptions: {
			include_docs: true
		}
	});

	private _mobileQueryListener: () => void;

	constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private store: Store<{}>) {
		this.mobileQuery = media.matchMedia('(max-width: 600px)');
		this._mobileQueryListener = () => changeDetectorRef.detectChanges();
		this.mobileQuery.addEventListener('change', this._mobileQueryListener);
	}

	ngOnDestroy() {
		this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
	}

	//#region sidenavs
	sidenavsClose() {
		this.store.dispatch(FeatureActions.Sidenavs.close());
	}

	//#region sidenavStart
	sidenavStartClose() {
		this.store.dispatch(FeatureActions.Sidenavs.Start.close());
	}
	sidenavStartOpen() {
		this.store.dispatch(FeatureActions.Sidenavs.Start.open());
	}
	sidenavStartToggle() {
		this.store.dispatch(FeatureActions.Sidenavs.Start.toggle());
	}
	//#endregion

	//#region sidenavEnd
	sidenavEndClose() {
		this.store.dispatch(FeatureActions.Sidenavs.End.close());
	}
	sidenavEndOpen() {
		this.store.dispatch(FeatureActions.Sidenavs.End.open());
	}
	sidenavEndToggle() {
		this.store.dispatch(FeatureActions.Sidenavs.End.toggle());
	}
	//#endregion
	//#endregion
}
