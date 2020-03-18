import {
	reducer as appEnvsApiGet,
	State as AppEnvsApiGet
	} from './envs/api/get.reducer';
import { featureName } from '../feature.config';
import { InjectionToken } from '@angular/core';
import { Params } from '@angular/router';
import {
	routerReducer as appRouter,
	RouterReducerState
	} from '@ngrx/router-store';
import {
	Action,
	ActionReducer,
	ActionReducerMap,
	MetaReducer
	} from '@ngrx/store';

export interface RouterStateSnapshot {
	params: Params;
	queryParams: Params;
	url: string;
}

// tslint:disable-next-line: no-empty-interface
export interface FeatureState {
	appEnvsApiGet: AppEnvsApiGet;
	appRouter: RouterReducerState<RouterStateSnapshot>;
}

export interface State {
	[featureName]: FeatureState;
}

export const reducers = new InjectionToken<ActionReducerMap<FeatureState, Action>>('root', {
	factory: () => ({ appEnvsApiGet, appRouter })
});

export function failureLogger(reducer: ActionReducer<any>): ActionReducer<any> {
	return function<T>(state, action: { type: string; [key: string]: any }) {
		const isFailureAction = action.type.endsWith('failure') || action.type.endsWith('Failure');
		if (isFailureAction) {
			console.error({ ...action });
		}
		return reducer(state, action);
	};
}

export const metaReducers: MetaReducer<{}>[] = [failureLogger];
