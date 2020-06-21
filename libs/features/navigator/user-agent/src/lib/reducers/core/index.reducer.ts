import { createReducer } from '@ngrx/store';

export interface State {
	userAgent: string;
}

export const initialState: State = {
	userAgent: window.navigator.userAgent
};

export const reducer = createReducer(initialState);
