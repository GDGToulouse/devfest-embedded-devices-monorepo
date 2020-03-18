import { Actions as FeatureActions } from '../actions';
import { Selectors as RouteSelectors } from '../selectors';
import { MediaMatcher } from '@angular/cdk/layout';
import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	OnDestroy
	} from '@angular/core';
import {
	select,
	Store
	} from '@ngrx/store';
import { of } from 'rxjs';

@Component({
	selector: 'gdgtoulouse-libs-components-apps-embedded-device-manager-routes-route-index-c',
	templateUrl: './index.component.html',
	styleUrls: ['./index.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class IndexComponent implements OnDestroy {
	gridTemplateAreas$ = this.store.pipe(select(RouteSelectors.gridTemplateAreas$));
	gridTemplateColumns$ = this.store.pipe(select(RouteSelectors.gridTemplateColumns$));
	gridTemplateRows$ = this.store.pipe(select(RouteSelectors.gridTemplateRows$));
	langMenuItem$ = this.store.pipe(select(RouteSelectors.langMenuItem$));
	langMenuList$ = this.store.pipe(select(RouteSelectors.langMenuList$));
	mobileQuery: MediaQueryList;
	menuEndTogglerTooltip$ = of({ ariaLabel: { text: 'Button that displays a tooltip when focused or hovered over' }, tooltip: { text: 'Info about the action' } });
	menuLangsTooltip$ = of({ ariaLabel: { text: 'Button that displays a tooltip when focused or hovered over' }, tooltip: { text: 'Info about the action' } });
	menuEndTree$ = this.store.pipe(select(RouteSelectors.menuEndTree$));
	sidenavEndIsOpen$ = this.store.pipe(select(RouteSelectors.sidenavEndIsOpen$));
	sidenavEndTogglerTooltip$ = of({ ariaLabel: { text: 'Button that displays a tooltip when focused or hovered over' }, tooltip: { text: 'Info about the action' } });
	sidenavStartIsOpen$ = this.store.pipe(select(RouteSelectors.sidenavStartIsOpen$));
	sidenavStartTogglerTooltip$ = of({ ariaLabel: { text: 'Button that displays a tooltip when focused or hovered over' }, tooltip: { text: 'Info about the action' } });
	leftSidenavItemList$ = of([{ label: { text: 'menu left item1 in lang1', routerLink: '.' } }, { label: { text: 'menu left item2 in lang1', routerLink: '.' } }, { label: { text: 'menu left item3 in lang1', routerLink: '.' } }]);
	rightSidenavItemList$ = of([{ label: { text: 'menu right item1 in lang1', routerLink: '.' } }, { label: { text: 'menu right item2 in lang1', routerLink: '.' } }, { label: { text: 'menu right item3 in lang1', routerLink: '.' } }]);
	title$ = of({ text: 'Responsive app lang1' });

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
	closeSidenavs() {
		this.store.dispatch(FeatureActions.Sidenavs.close());
	}

	//#region sidenavStart
	closeSidenavStart() {
		this.store.dispatch(FeatureActions.Sidenavs.Start.close());
	}
	openSidenavStart() {
		this.store.dispatch(FeatureActions.Sidenavs.Start.open());
	}
	toggleSidenavStart() {
		this.store.dispatch(FeatureActions.Sidenavs.Start.toggle());
	}
	//#endregion

	//#region sidenavEnd
	closeSidenavEnd() {
		this.store.dispatch(FeatureActions.Sidenavs.End.close());
	}
	openSidenavEnd() {
		this.store.dispatch(FeatureActions.Sidenavs.End.open());
	}
	toggleSidenavEnd() {
		this.store.dispatch(FeatureActions.Sidenavs.End.toggle());
	}
	//#endregion
	//#endregion
}
