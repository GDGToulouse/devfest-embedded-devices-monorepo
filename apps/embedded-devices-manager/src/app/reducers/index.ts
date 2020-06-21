import {
	reducer as envsApiGet,
	State as EnvsApiGet
	} from './envs/api/get.reducer';
import { indexName } from '../index.config';
import { InjectionToken } from '@angular/core';
import { Params } from '@angular/router';
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
	envsApiGet: EnvsApiGet;
}

export interface State {
	[indexName]: FeatureState;
}

export const reducers = new InjectionToken<ActionReducerMap<FeatureState, Action>>(indexName, {
	factory: () => ({ envsApiGet })
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
