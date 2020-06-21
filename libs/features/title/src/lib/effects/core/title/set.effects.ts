import { Actions as FeatureActions } from '../../../actions';
import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {
	Actions,
	createEffect,
	ofType
	} from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
	combineLatest,
	of
	} from 'rxjs';
import {
	// catchError,
	delay,
	switchMap
} from 'rxjs/operators';

export const topic = 'envs-api-get';

@Injectable()
export class Effects {
	main$ = createEffect(
		() =>
			combineLatest([this.actions$.pipe(ofType(FeatureActions.Core.Title.Set.action))]).pipe(
				//tap(() => this.store.dispatch(ProcessingsActions.Processings.Add.exec({ label: `[${indexName}][${topic}] main$` }))),
				delay(20),
				switchMap(([{ text }]) => {
					this.title.setTitle(text);
					return of({ type: 'todo' });
				})
				//tap(() => this.store.dispatch(ProcessingsActions.Processings.Remove.exec({ label: `[${indexName}][${topic}] main$` })))
			),
		{ dispatch: true }
	);

	constructor(private actions$: Actions, private title: Title, private store: Store<{}>) {}
}
