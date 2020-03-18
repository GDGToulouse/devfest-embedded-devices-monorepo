import { Actions as FeatureActions } from '../actions';
import {
	createReducer,
	on
	} from '@ngrx/store';

export interface State {
	templateAreas: string;
	templateColumns: string;
	templateRows: string;
}

export const initialState: State = {
	templateAreas: "'headerAside1 headerMain headerAside2' 'mainAside1 mainMain mainAside2' 'footerAside1 footerMain footerAside2'",
	templateColumns: '1fr 3fr 1fr',
	templateRows: '1fr 3fr 1fr'
};

export const reducer = createReducer(
	initialState,
	on(FeatureActions.Grid.resetToInitialState, () => initialState),
	on(FeatureActions.Grid.setTemplateAreas, (state, { templateAreas }) => ({
		...state,
		templateAreas
	})),
	on(FeatureActions.Grid.setTemplateColumns, (state, { templateColumns }) => ({
		...state,
		templateColumns
	})),
	on(FeatureActions.Grid.setTemplateRows, (state, { templateRows }) => ({
		...state,
		templateRows
	}))
);
