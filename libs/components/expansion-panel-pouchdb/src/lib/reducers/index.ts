import {
	reducer as changesFeedsSubscriptionsSubscribe,
	State as ChangesFeedsSubscriptionsSubscribe
	} from './changes-feeds/subscriptions/subscribe.reducer';
import { indexName } from '../index.config';
import {
	Action,
	combineReducers,
	createFeatureSelector
	} from '@ngrx/store';

export interface FeatureState {
	changesFeedsSubscriptionsSubscribe: ChangesFeedsSubscriptionsSubscribe;
}

export interface State {
	[indexName]: FeatureState;
}

export function reducers(state: FeatureState | undefined, action: Action) {
	return combineReducers({
		changesFeedsSubscriptionsSubscribe
	})(state, action);
}

export const getFeatureState = createFeatureSelector<State, FeatureState>(indexName);
