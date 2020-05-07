import { Params } from '@angular/router';
import { RouterReducerState } from '@ngrx/router-store';
import {
	createFeatureSelector,
	createSelector
	} from '@ngrx/store';

//#region router
export const router$ = createFeatureSelector<
	RouterReducerState<{
		params: Params;
		queryParams: Params;
		url: string;
	}>
>('appRouter');

//TODO put keyIsInQueryParams somewhere else as mutualized code
export const keyIsInQueryParams$ = (key: string) => createSelector(router$, (router) => (router === undefined ? undefined : Object.keys(router.state.queryParams).includes(key)));

export const currentChildSegment$ = createSelector(router$, (router) => (router === undefined ? undefined : router.state.url.includes('pouchdb-manager/') ? router.state.url.split('pouchdb-manager/')[1].split('/')[0] : ''));

export const Selectors = {
	currentChildSegment$
};
