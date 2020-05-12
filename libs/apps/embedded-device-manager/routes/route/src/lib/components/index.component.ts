import { Actions as FeatureActions } from '../actions';
import { Selectors as FeatureSelectors } from '../selectors';
import { MediaMatcher } from '@angular/cdk/layout';
import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	OnDestroy
	} from '@angular/core';
import { Tree } from '@gdgtoulouse/components/expansion-panel';
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

	// treeListFromFlatNodeList$ = of(
	// 	treeListFromFlatNodeList([
	// 		{ _id: 'access-point', pid: null },
	// 		{ _id: 'access-point-configure', pid: 'access-point' },
	// 		{ _id: 'access-point-restart', pid: 'access-point' },
	// 		{ _id: 'system', pid: null },
	// 		{ _id: 'system-reboot', pid: 'system' },
	// 		{ _id: 'system-terminal', pid: 'system' },
	// 		{ _id: 'system-update', pid: 'system' },
	// 		{ _id: 'system-upgrade', pid: 'system' },
	// 		{ _id: 'projects', pid: null },
	// 		{ _id: 'projects-com', pid: 'projects' },
	// 		{ _id: 'projects-com-gpio', pid: 'projects-com' },
	// 		{ _id: 'projects-com-gpio-configs', pid: 'projects-com-gpio' },
	// 		{ _id: 'projects-com-gpio-configs-blink', pid: 'projects-com-gpio-configs' },
	// 		{ _id: 'projects-com-gpio-configs-blink-list', pid: 'projects-com-gpio-configs-blink' },
	// 		{ _id: 'projects-com-gpio-configs-blink-update', pid: 'projects-com-gpio-configs-blink' },
	// 		{ _id: 'projects-com-gpio-configs-fade', pid: 'projects-com-gpio-configs' },
	// 		{ _id: 'projects-com-gpio-configs-fade-list', pid: 'projects-com-gpio-configs-fade' },
	// 		{ _id: 'projects-com-gpio-configs-fade-update', pid: 'projects-com-gpio-configs-fade' },
	// 		{ _id: 'projects-com-gpio-configs-static', pid: 'projects-com-gpio-configs' },
	// 		{ _id: 'projects-com-gpio-configs-static-list', pid: 'projects-com-gpio-configs-static' },
	// 		{ _id: 'projects-com-gpio-configs-static-update', pid: 'projects-com-gpio-configs-static' },
	// 		{ _id: 'projects-com-gpio-executions', pid: 'projects-com-gpio' },
	// 		{ _id: 'projects-com-gpio-executions-list', pid: 'projects-com-gpio-executions' },
	// 		{ _id: 'projects-com-gpio-executions-update', pid: 'projects-com-gpio-executions' },
	// 		{ _id: 'projects-com-i2c', pid: 'projects-com' },
	// 		{ _id: 'projects-com-i2c-configs', pid: 'projects-com-i2c' },
	// 		{ _id: 'projects-com-i2c-configs-list', pid: 'projects-com-i2c-configs' },
	// 		{ _id: 'projects-com-i2c-configs-update', pid: 'projects-com-i2c-configs' },
	// 		{ _id: 'projects-com-i2c-executions', pid: 'projects-com-i2c' },
	// 		{ _id: 'projects-com-i2c-executions-list', pid: 'projects-com-i2c-executions' },
	// 		{ _id: 'projects-com-i2c-executions-update', pid: 'projects-com-i2c-executions' },
	// 		{ _id: 'projects-com-pwm', pid: 'projects-com' },
	// 		{ _id: 'projects-com-pwm-configs', pid: 'projects-com-pwm' },
	// 		{ _id: 'projects-com-pwm-configs-list', pid: 'projects-com-pwm-configs' },
	// 		{ _id: 'projects-com-pwm-configs-update', pid: 'projects-com-pwm-configs' },
	// 		{ _id: 'projects-com-pwm-executions', pid: 'projects-com-pwm' },
	// 		{ _id: 'projects-com-pwm-executions-list', pid: 'projects-com-pwm-executions' },
	// 		{ _id: 'projects-com-pwm-executions-update', pid: 'projects-com-pwm-executions' },
	// 		{ _id: 'projects-com-spi', pid: 'projects-com' },
	// 		{ _id: 'projects-com-spi-configs', pid: 'projects-com-spi' },
	// 		{ _id: 'projects-com-spi-configs-list', pid: 'projects-com-spi-configs' },
	// 		{ _id: 'projects-com-spi-configs-update', pid: 'projects-com-spi-configs' },
	// 		{ _id: 'projects-com-spi-executions', pid: 'projects-com-spi' },
	// 		{ _id: 'projects-com-spi-executions-list', pid: 'projects-com-spi-executions' },
	// 		{ _id: 'projects-com-spi-executions-update', pid: 'projects-com-spi-executions' },
	// 		{ _id: 'projects-com-uart', pid: 'projects-com' },
	// 		{ _id: 'projects-com-uart-configs', pid: 'projects-com-uart' },
	// 		{ _id: 'projects-com-uart-configs-list', pid: 'projects-com-uart-configs' },
	// 		{ _id: 'projects-com-uart-configs-update', pid: 'projects-com-uart-configs' },
	// 		{ _id: 'projects-com-uart-executions', pid: 'projects-com-uart' },
	// 		{ _id: 'projects-com-uart-executions-list', pid: 'projects-com-uart-executions' },
	// 		{ _id: 'projects-com-uart-executions-update', pid: 'projects-com-uart-executions' },
	// 		{ _id: 'projects-countdown', pid: 'projects' },
	// 		{ _id: 'projects-countdown-configs', pid: 'projects-countdown' },
	// 		{ _id: 'projects-countdown-configs-list', pid: 'projects-countdown-configs' },
	// 		{ _id: 'projects-countdown-configs-update', pid: 'projects-countdown-configs' },
	// 		{ _id: 'projects-countdown-executions', pid: 'projects-countdown' },
	// 		{ _id: 'projects-countdown-executions-list', pid: 'projects-countdown-executions' },
	// 		{ _id: 'projects-countdown-executions-update', pid: 'projects-countdown-executions' }
	// 	])
	// );

	treeList: Tree[] = [
		{
			data: {
				_id: 'test1',
				header: {
					description: 'description1',
					title: 'test1'
				}
			},
			treeList: []
		},
		{
			data: {
				_id: 'test2',
				header: {
					description: 'description2',
					title: 'test2'
				}
			},
			treeList: [
				{
					data: {
						_id: 'test2.0',
						header: {
							description: 'description2.0',
							title: 'test2.0'
						}
					},
					treeList: []
				},
				{
					data: {
						_id: 'test2.1',
						router: {
							routerLink: ['./index.html']
						}
					},
					treeList: []
				},
				{
					data: {
						_id: 'test2.2',
						header: {
							description: 'description2.2',
							title: 'test2.2'
						}
					},
					treeList: [
						{
							data: {
								_id: 'test2.2.1',
								header: {
									description: 'description2.2.1',
									title: 'test2.2.1'
								}
							},
							treeList: [
								{
									data: {
										_id: 'test2.2.1.1',
										router: {
											routerLink: ['./index.html']
										}
									},
									treeList: []
								},
								{
									data: {
										_id: 'test2.2.1.2',
										router: {
											routerLink: ['./index.html']
										}
									},
									treeList: []
								}
							]
						},
						{
							data: {
								_id: 'test2.2.2',
								router: {
									routerLink: ['./index.html']
								}
							},
							treeList: []
						}
					]
				}
			]
		}
	];

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
