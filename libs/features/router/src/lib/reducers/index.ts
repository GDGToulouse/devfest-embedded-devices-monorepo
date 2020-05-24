import {
	reducer as envsApiGet,
	State as EnvsApiGet
	} from './envs/api/get.reducer';
import { indexName } from '../index.config';
import { RouterStateSnapshot } from '../models';
import { InjectionToken } from '@angular/core';
import {
	routerReducer as router,
	RouterReducerState
	} from '@ngrx/router-store';
import {
	Action,
	ActionReducerMap
	} from '@ngrx/store';

export interface FeatureState {
	envsApiGet: EnvsApiGet;
	router: RouterReducerState<RouterStateSnapshot>;
}

export interface State {
	[indexName]: FeatureState;
}

export const reducers = new InjectionToken<ActionReducerMap<FeatureState, Action>>(indexName, {
	factory: () => ({ envsApiGet, router })
});
