import { Actions as FeatureActions } from '../../actions';
import { indexName } from '../../index.config';
import { Injectable } from '@angular/core';
import { Selectors as FeaturesLangSelectors } from '@gdgtoulouse/features/lang';
import { Actions as FeaturesTitleActions } from '@gdgtoulouse/features/title';
import {
	Actions,
	createEffect,
	ofType
	} from '@ngrx/effects';
import {
	select,
	Store
	} from '@ngrx/store';
import {
	combineLatest,
	of
	} from 'rxjs';
import {
	// catchError,
	delay,
	switchMap,
	withLatestFrom
} from 'rxjs/operators';

export const topic = 'envs-api-get';

@Injectable()
export class Effects {
	main$ = createEffect(
		() =>
			combineLatest([this.actions$.pipe(ofType(FeatureActions.Resolver.resolve))]).pipe(
				delay(20),
				withLatestFrom(this.store.pipe(select(FeaturesLangSelectors.langId$))),
				switchMap(([[_], langId]) => of(FeaturesTitleActions.Core.Title.Set.action({ text: indexName })))
			),
		{ dispatch: true }
	);

	constructor(private actions$: Actions, private store: Store<{}>) {}
}
