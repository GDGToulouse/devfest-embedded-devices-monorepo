import {
	reducer as envsApiGet,
	State as EnvsApiGet
	} from './envs/api/get.reducer';
import { indexName } from '../index.config';
import {
	Action,
	combineReducers
	} from '@ngrx/store';

export interface FeatureState {
	envsApiGet: EnvsApiGet;
}

export interface State {
	[indexName]: FeatureState;
}

export function reducers(state: FeatureState | undefined, action: Action) {
	return combineReducers({
		envsApiGet
	})(state, action);
}
