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

export const keyIsInQueryParams$ = (key: string) => createSelector(router$, (router) => (router === undefined ? undefined : Object.keys(router.state.queryParams).includes(key)));

export const Selectors = {};
