import { featureName } from '../feature.config';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot
  } from '@angular/router';
import {
  createAction,
  props,
  union
  } from '@ngrx/store';

const actions = 'resolver';

export const resolve = createAction(`[${featureName}][${actions}] resolve`, props<{ activatedRouteSnapshot: ActivatedRouteSnapshot; routerStateSnapshot: RouterStateSnapshot }>());

const all = union({
	resolve
});
export type ActionsUnion = typeof all;
