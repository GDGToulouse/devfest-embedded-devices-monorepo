import {
	reducer as changesFeedsSubscriptionsSubscribe,
	State as ChangesFeedsSubscriptionsSubscribe
	} from './changes-feeds/subscriptions/subscribe.reducer';
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
	changesFeedsSubscriptionsSubscribe: ChangesFeedsSubscriptionsSubscribe;
	envsApiGet: EnvsApiGet;
}

export interface State {
	[indexName]: FeatureState;
}

export function reducers(state: FeatureState | undefined, action: Action) {
	return combineReducers({
		changesFeedsSubscriptionsSubscribe,
		envsApiGet
	})(state, action);
}
