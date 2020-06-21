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

export const envsAuthSelector = createSelector(
	getFeatureState$,
	({
		envsApiGet: {
			response: { auth }
		}
	}) => auth
);
