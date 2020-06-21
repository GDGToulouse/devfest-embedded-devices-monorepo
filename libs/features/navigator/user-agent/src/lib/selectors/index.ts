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

export const core$ = createSelector(getFeatureState$, ({ core }) => core);
export const userAgent$ = createSelector(core$, ({ userAgent }) => userAgent);

export const Selectors = {
	core$,
	userAgent$
};
