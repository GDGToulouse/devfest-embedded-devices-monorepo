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

//#region reducer
export const listSelector = createSelector(
	({ processings }: State) => processings,
	({ reducer: { list } }) => list
);

export const listHasAtLeastOneItemSelector = createSelector(
	listSelector,
	(list) => list.length > 0
);
//#endregion
