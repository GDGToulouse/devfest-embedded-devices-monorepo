import {
	reducer as coreErrorsIndex,
	State as CoreErrorsIndex
	} from './core/errors/index.reducer';
import {
	reducer as coreInfosIndex,
	State as CoreInfosIndex
	} from './core/infos/index.reducer';
import {
	reducer as coreLogsIndex,
	State as CoreLogsIndex
	} from './core/logs/index.reducer';
import {
	reducer as coreWarningsIndex,
	State as CoreWarningsIndex
	} from './core/warnings/index.reducer';
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
	coreErrorsIndex: CoreErrorsIndex;
	envsApiGet: EnvsApiGet;
	coreLogsIndex: CoreLogsIndex;
	coreInfosIndex: CoreInfosIndex;
	coreWarningsIndex: CoreWarningsIndex;
}

export interface State {
	[indexName]: FeatureState;
}

export const reducers = new InjectionToken<ActionReducerMap<FeatureState, Action>>(indexName, {
	factory: () => ({ coreErrorsIndex, coreLogsIndex, coreInfosIndex, coreWarningsIndex, envsApiGet })
});
