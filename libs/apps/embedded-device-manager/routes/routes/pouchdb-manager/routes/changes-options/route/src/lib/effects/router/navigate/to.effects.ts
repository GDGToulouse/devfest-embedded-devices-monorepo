import { Actions as FeatureActions } from '../../../actions';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
	Actions,
	createEffect,
	ofType
	} from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { from } from 'rxjs';
import { switchMap } from 'rxjs/operators';

export const topic = 'router-navigate-to';

@Injectable()
export class Effects {
	subroute$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(FeatureActions.Uis.ChildRouteSelect.NgSelect.change),
				switchMap((action) => {
					return from(this.router.navigate([action.event.id]));
				})
			),
		{ dispatch: false }
	);
	constructor(private actions$: Actions, private router: Router, private routeStore: Store<{}>) {}
}
