import { indexName } from '../index.config';
import {
	ActivatedRouteSnapshot,
	RouterStateSnapshot
	} from '@angular/router';
import {
	createAction,
	props
	} from '@ngrx/store';

const actions = 'resolver';

export const resolve = createAction(`[${indexName}][${actions}] resolve`, props<{ activatedRouteSnapshot: ActivatedRouteSnapshot; routerStateSnapshot: RouterStateSnapshot }>());
