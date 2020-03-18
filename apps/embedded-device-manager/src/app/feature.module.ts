import { IndexComponent } from './components/index.component';
import { Effects } from './effects';
import {
	metaReducers,
	reducers,
	RouterStateSnapshot
	} from './reducers';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
	RouterModule,
	RouterStateSnapshot as AngularRouterStateSnapshot
	} from '@angular/router';
import { FeatureModule as ProcessingsFeatureModule } from '@gdgtoulouse/features/processings';
import { EffectsModule } from '@ngrx/effects';
import {
	RouterReducerState,
	RouterStateSerializer as NgrxRouterStateSerializer,
	StoreRouterConnectingModule
	} from '@ngrx/router-store';
import {
	DefaultProjectorFn,
	MemoizedSelector,
	StoreModule
	} from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

export type RouterSelector = MemoizedSelector<object, RouterReducerState<RouterStateSnapshot>, DefaultProjectorFn<RouterReducerState<RouterStateSnapshot>>>;

export class RouterStateSerializer implements NgrxRouterStateSerializer<RouterStateSnapshot> {
	serialize(routerState: AngularRouterStateSnapshot): RouterStateSnapshot {
		const routerStateSnapshot: RouterStateSnapshot = {
			url: routerState.url,
			params: routerState.root.params,
			queryParams: routerState.root.queryParams
		};

		return routerStateSnapshot;
	}
}

@NgModule({
	bootstrap: [IndexComponent],
	declarations: [IndexComponent],
	imports: [
		BrowserAnimationsModule,
		EffectsModule.forRoot(Effects),
		HttpClientModule,
		ProcessingsFeatureModule,
		RouterModule.forRoot(
			[
				{
					path: '',
					loadChildren: () => import('@gdgtoulouse/apps/embedded-device-manager/routes/route').then((module) => module.FeatureModule)
				}
			],
			{ initialNavigation: 'enabled' }
		),
		StoreModule.forRoot(reducers, {
			runtimeChecks: {
				strictStateImmutability: true,
				strictActionImmutability: true,
				strictStateSerializability: true,
				strictActionSerializability: true
			},
			metaReducers
		}),
		StoreRouterConnectingModule.forRoot(),
		StoreDevtoolsModule.instrument({
			maxAge: 50,
			name: 'apps-embedded-device-manager'
		})
	],
	providers: [
		{
			provide: NgrxRouterStateSerializer,
			useClass: RouterStateSerializer
		}
	]
})
export class FeatureModule {}
