import { Effects } from './effects';
import { indexName } from './index.config';
import { RouterStateSnapshot } from './models';
import { reducers } from './reducers';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterStateSnapshot as AngularRouterStateSnapshot } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import {
	RouterState,
	RouterStateSerializer as NgrxRouterStateSerializer,
	StoreRouterConnectingModule
	} from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';

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
	imports: [CommonModule, StoreModule.forFeature(indexName, reducers), EffectsModule.forFeature(Effects), StoreRouterConnectingModule.forRoot({ serializer: RouterStateSerializer, routerState: RouterState.Minimal })],
	providers: []
})
export class IndexModule {}
