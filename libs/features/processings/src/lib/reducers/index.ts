import { Actions as FeatureActions } from '../actions';
import { indexName } from '../index.config';
import {
	Action,
	combineReducers,
	createReducer,
	on
	} from '@ngrx/store';

export type Item = object & { label: string };
export interface ItemsState {
	list: Item[];
}

export interface FeatureState {
	reducer: ItemsState;
}

export const initialState: FeatureState = {
	reducer: {
		list: []
	}
};

export interface State {
	[indexName]: FeatureState;
}

export const reducer = createReducer(
	initialState.reducer,
	on(FeatureActions.Processings.Add.exec, (state, { type, ...item }): ItemsState => ({ ...state, list: [...state.list, item] })),
	on(FeatureActions.Processings.Remove.exec, (state, action): ItemsState => ({ ...state, list: state.list.filter(({ label }) => action.label !== label) }))
);

export function reducers(featureState: FeatureState | undefined, action: Action) {
	return combineReducers({
		reducer
	})(featureState, action);
}
