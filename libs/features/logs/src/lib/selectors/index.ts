import { indexName } from '../index.config';
import {
	FeatureState,
	State
	} from '../reducers';
import {
	createFeatureSelector,
	createSelector
	} from '@ngrx/store';

//#region feature
export const getFeatureState$ = createFeatureSelector<State, FeatureState>(indexName);
//#endregion

export const errors$ = createSelector(getFeatureState$, ({ coreErrorsIndex }) => coreErrorsIndex);
export const errorsMessageList$ = createSelector(errors$, ({ messageList }) => messageList);

export const Selectors = {
	errors$,
	errorsMessageList$
};
