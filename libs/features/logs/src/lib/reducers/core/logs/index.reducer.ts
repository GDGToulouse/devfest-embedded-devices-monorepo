import { Actions as FeatureActions } from '../../../actions';
import { DatedMessage } from '../../../models';
import {
	createReducer,
	on
	} from '@ngrx/store';

export interface State {
	messageListMaxLength: number;
	messageList: DatedMessage[];
}

export const initialState: State = {
	messageListMaxLength: 100,
	messageList: []
};

//TODO: generic method elsewhere that does the following circular buffering logic
export const reducer = createReducer(
	initialState,
	on(
		FeatureActions.Core.Log.Add.action,
		(state, { message }): State => ({
			...state,
			messageList: state.messageList.length >= state.messageListMaxLength ? [...state.messageList.slice(state.messageList.length - state.messageListMaxLength + 1), { ...message, addedDate: Date().toString() }] : [...state.messageList, { ...message, addedDate: Date().toString() }]
		})
	)
);
