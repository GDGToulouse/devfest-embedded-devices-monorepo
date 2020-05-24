import { Actions as FeatureActions } from '../../../actions';
import {
	createReducer,
	on
	} from '@ngrx/store';

export interface State {
	isOpened: boolean;
}

export const initialState: State = {
	isOpened: true
};

export const reducer = createReducer(
	initialState,
	on(FeatureActions.Sidenavs.End.close, FeatureActions.Sidenavs.close, (state) => ({
		...state,
		isOpened: false
	})),
	on(FeatureActions.Sidenavs.End.open, (state) => ({
		...state,
		isOpened: true
	})),
	on(FeatureActions.Sidenavs.End.toggle, (state) => ({
		...state,
		isOpened: !state.isOpened
	}))
);
