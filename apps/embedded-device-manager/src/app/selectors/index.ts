import { featureName } from '../feature.config';
import {
	FeatureState,
	State
	} from '../reducers';
import {
	createFeatureSelector,
	createSelector
	} from '@ngrx/store';

//#region feature
export const getFeatureState = createFeatureSelector<State, FeatureState>(featureName);
//#endregion

export const envsAuthSelector = createSelector(
	getFeatureState,
	({
		appEnvsApiGet: {
			response: { auth }
		}
	}) => auth
);
