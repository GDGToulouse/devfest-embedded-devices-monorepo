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

export const url$ = createSelector(getFeatureState$, ({ router }) => (router === undefined ? undefined : router.state.url));

export const nextSegment$ = (currentSegment: string) => createSelector(getFeatureState$, ({ router }) => (router === undefined ? undefined : router.state.url.includes(`${currentSegment}/`) ? router.state.url.split(`${currentSegment}/`)[1].split('/')[0] : ''));

export const queryParam$ = (key: string) => createSelector(getFeatureState$, ({ router }) => (router === undefined ? undefined : router.state.queryParams[key]));
export const queryParams$ = (keyList: string[]) =>
	createSelector(getFeatureState$, ({ router }) =>
		router === undefined
			? undefined
			: keyList.reduce((queryParams, key) => {
					queryParams[key] = router.state.queryParams[key];
					return queryParams;
			  }, {})
	);
export const areKeyListInQueryParams$ = (keyList: string[]) => createSelector(getFeatureState$, ({ router }) => (router === undefined ? undefined : keyList.reduce((areKeyListIsInQueryParams, key) => areKeyListIsInQueryParams && Object.keys(router.state.queryParams).includes(key), true)));

export const Selectors = {
	getFeatureState$,
	url$,
	nextSegment$,
	queryParam$,
	queryParams$,
	areKeyListInQueryParams$
};
