import { Actions as FeatureActions } from '../../../actions';
import { Tree } from '@gdgtoulouse/components/expansion-panel';
import { PouchdbCompleteChangesRequest } from '@gdgtoulouse/types';
import {
	createReducer,
	on
	} from '@ngrx/store';

export interface State {
	list: { changesRequest: PouchdbCompleteChangesRequest; tree: Tree }[];
}

export const initialState: State = {
	list: []
};

export const reducer = createReducer(
	initialState,
	on(
		FeatureActions.Ui.ExpansionPanel.Opened.exec,
		(state, { changesRequest, tree }): State => {
			return {
				...state,
				list: [...state.list, { changesRequest, tree }]
			};
		}
	)
);
