import { indexName } from '../index.config';
import {
	FeatureState,
	State
	} from '../reducers';
import { Selectors as FeatureRouterSelectors } from '@gdgtoulouse/features/router';
import {
	createFeatureSelector,
	createSelector
	} from '@ngrx/store';

//#region feature
export const getFeatureState$ = createFeatureSelector<State, FeatureState>(indexName);
export const envsApiGet$ = createSelector(getFeatureState$, ({ envsApiGet }) => envsApiGet);
//#endregion

export const langIdQueryParam$ = FeatureRouterSelectors.queryParam$('langId');
export const langIdIsInQueryParams$ = FeatureRouterSelectors.areKeyListInQueryParams$(['langId']);
export const langIdIsNotInQueryParams$ = createSelector(langIdIsInQueryParams$, (langIdIsInQueryParams) => !langIdIsInQueryParams);
export const langId$ = createSelector(langIdIsInQueryParams$, langIdQueryParam$, (langIdIsInQueryParams, langIdQueryParam) => (langIdIsInQueryParams ? langIdQueryParam : 'en'));

export const Selectors = { getFeatureState$, langIdQueryParam$, langIdIsInQueryParams$, langIdIsNotInQueryParams$, langId$ };
