import {
	reducer as core,
	State as Core
	} from './core/index.reducer';
import {
	reducer as envsApiGet,
	State as EnvsApiGet
	} from './envs/api/get.reducer';
import { indexName } from '../index.config';
import { InjectionToken } from '@angular/core';
import {
	Action,
	ActionReducerMap
	} from '@ngrx/store';

export interface FeatureState {
	core: Core;
	envsApiGet: EnvsApiGet;
}

export interface State {
	[indexName]: FeatureState;
}

export const reducers = new InjectionToken<ActionReducerMap<FeatureState, Action>>(indexName, {
	factory: () => ({ core, envsApiGet })
});
