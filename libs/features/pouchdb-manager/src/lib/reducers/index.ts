import {
	reducer as changesFeedsSubscriptionsSubscribe,
	State as ChangesFeedsSubscriptionsSubscribe
	} from './changes-feeds/subscriptions/subscribe.reducer';
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

export interface FeatureState {
	changesFeedsSubscriptionsSubscribe: ChangesFeedsSubscriptionsSubscribe;
	envsApiGet: EnvsApiGet;
}

export interface State {
	[featureName]: FeatureState;
}

export function reducers(state: FeatureState | undefined, action: Action) {
	return combineReducers({
		changesFeedsSubscriptionsSubscribe,
		envsApiGet
	})(state, action);
}

export const getFeatureState = createFeatureSelector<State, FeatureState>(featureName);
