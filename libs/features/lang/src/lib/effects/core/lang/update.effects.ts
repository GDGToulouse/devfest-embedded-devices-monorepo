import { Actions as FeatureActions } from '../../../actions';
import { Injectable } from '@angular/core';
import {
	ActivatedRoute,
	Router
	} from '@angular/router';
import {
	Actions,
	createEffect,
	ofType
	} from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
	combineLatest,
	from,
	of
	} from 'rxjs';
import {
	// catchError,
	delay,
	switchMap
} from 'rxjs/operators';

export const topic = 'core-lang-update';

@Injectable()
export class Effects {
	update$ = createEffect(
		() =>
			combineLatest([this.actions$.pipe(ofType(FeatureActions.Envs.Api.Get.response)), this.actions$.pipe(ofType(FeatureActions.Core.Lang.Update.action))]).pipe(
				//tap(() => this.store.dispatch(ProcessingsActions.Processings.Add.exec({ label: `[${indexName}][${topic}] main$` }))),
				delay(20),
				switchMap(
					([
						{
							response: { defaultLangId }
						},
						{ langId }
					]) => {
						const isDefaultLangRequested = langId === defaultLangId;
						if (isDefaultLangRequested) {
							return of(FeatureActions.Core.Lang.UpdateToDefault.requested());
						} else {
							return of(FeatureActions.Core.Lang.UpdateToNotDefault.requested({ langId }));
						}
					}
				)
				//tap(() => this.store.dispatch(ProcessingsActions.Processings.Remove.exec({ label: `[${indexName}][${topic}] main$` })))
			),
		{ dispatch: false }
	);

	updateToNotDefaultRequested$ = createEffect(
		() =>
			combineLatest([this.actions$.pipe(ofType(FeatureActions.Core.Lang.UpdateToNotDefault.requested))]).pipe(
				//tap(() => this.store.dispatch(ProcessingsActions.Processings.Add.exec({ label: `[${indexName}][${topic}] main$` }))),
				delay(20),
				switchMap(([{ langId }]) => {
					return from(
						this.router.navigate([], {
							relativeTo: this.activatedRoute,
							queryParams: {
								langId
							},
							queryParamsHandling: 'merge',
							skipLocationChange: false
						})
					);
				}),
				switchMap(() => {
					return of(FeatureActions.Core.Lang.UpdateToDefault.responded());
				})
				//tap(() => this.store.dispatch(ProcessingsActions.Processings.Remove.exec({ label: `[${indexName}][${topic}] main$` })))
			),
		{ dispatch: false }
	);

	updateToDefaultRequested$ = createEffect(
		() =>
			combineLatest([this.actions$.pipe(ofType(FeatureActions.Core.Lang.UpdateToDefault.requested))]).pipe(
				//tap(() => this.store.dispatch(ProcessingsActions.Processings.Add.exec({ label: `[${indexName}][${topic}] main$` }))),
				delay(20),
				switchMap(() =>
					from(
						this.router.navigate([], {
							relativeTo: this.activatedRoute,
							queryParams: {
								langId: null
							},
							queryParamsHandling: 'merge',
							skipLocationChange: false
						})
					)
				),
				switchMap(() => {
					return of(FeatureActions.Core.Lang.UpdateToNotDefault.responded());
				})
				//tap(() => this.store.dispatch(ProcessingsActions.Processings.Remove.exec({ label: `[${indexName}][${topic}] main$` })))
			),
		{ dispatch: false }
	);

	constructor(private actions$: Actions, private router: Router, private activatedRoute: ActivatedRoute, private store: Store<{}>) {}
}
