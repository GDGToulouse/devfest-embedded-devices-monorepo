import {
	reducer as envsApiGet,
	State as EnvsApiGet
	} from './envs/api/get.reducer';
import { featureName } from '../feature.config';
import {
	Action,
	combineReducers,
	createFeatureSelector
	} from '@ngrx/store';

export interface RouteState {
	envsApiGet: EnvsApiGet;
}

export interface State {
	[featureName]: RouteState;
}

export function reducers(state: RouteState | undefined, action: Action) {
	return combineReducers({
		envsApiGet
	})(state, action);
}

export const getFeatureState = createFeatureSelector<State, RouteState>(featureName);
