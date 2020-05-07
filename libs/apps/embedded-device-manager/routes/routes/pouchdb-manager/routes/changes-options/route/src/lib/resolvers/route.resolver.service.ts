import { Actions as FeatureActions } from '../actions';
import { Injectable } from '@angular/core';
import {
	ActivatedRouteSnapshot,
	Resolve,
	RouterStateSnapshot
	} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Injectable()
export class RouteResolverService implements Resolve<RouterStateSnapshot> {
	constructor(private store: Store<{}>) {}

	resolve(activatedRouteSnapshot: ActivatedRouteSnapshot, routerStateSnapshot: RouterStateSnapshot): Observable<any> | Promise<any> | any {
		this.store.dispatch(
			FeatureActions.Resolver.resolve({
				activatedRouteSnapshot,
				routerStateSnapshot
			})
		);
		return routerStateSnapshot;
	}
}
