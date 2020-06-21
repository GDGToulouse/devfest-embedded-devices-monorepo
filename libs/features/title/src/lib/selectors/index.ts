import { indexName } from '../index.config';
import {
	FeatureState,
	State
	} from '../reducers';
import { createFeatureSelector } from '@ngrx/store';

//#region feature
export const getFeatureState$ = createFeatureSelector<State, FeatureState>(indexName);
//#endregion

export const Selectors = {
	getFeatureState$
};
