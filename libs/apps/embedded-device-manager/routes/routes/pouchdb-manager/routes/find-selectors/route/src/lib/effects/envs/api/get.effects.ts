import {
	Actions as FeatureActions,
	Envs as FeatureEnvs
	} from '../../../actions';
import {
	HttpClient,
	HttpHeaders
	} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
	HttpHeadersConfig,
	HttpRequestParams
	} from '@gdgtoulouse/types';
import {
	Actions,
	createEffect,
	ofType
	} from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import {
	// catchError,
	delay,
	map,
	skip,
	switchMap,
	take,
	takeUntil,
	tap
} from 'rxjs/operators';

export const topic = 'envs-api-get';

@Injectable()
export class Effects {
	configuration$ = createEffect(
		() =>
			this.actions$.pipe(
				take(1),
				tap(() => this.store.dispatch(FeatureActions.Envs.Api.Get.request()))
			),
		{ dispatch: true }
	);

	main$ = createEffect(
		() =>
			combineLatest([this.actions$.pipe(ofType(FeatureActions.Envs.Api.Get.request))]).pipe(
				//tap(() => this.store.dispatch(ProcessingsActions.Processings.Add.exec({ label: `[${indexName}][${topic}] main$` }))),
				delay(20),
				switchMap(([_]) =>
					this.httpClient
						.request<FeatureEnvs.Api.Get.Response>('GET', this.endpointGenerator(), {
							observe: 'response',
							headers: new HttpHeaders(this.httpHeadersConfigGenerator()),
							params: this.httpRequestParamsGenerator()
						})
						.pipe(
							takeUntil(this.actions$.pipe(ofType(FeatureActions.Envs.Api.Get.request), skip(1))),
							map(({ body: response, headers: responseHeaders }) => FeatureActions.Envs.Api.Get.response({ response }))
							// catchError((failure) => of(FeatureActions.Envs.Api.Get.failure({ failure })))
						)
				)
				//tap(() => this.store.dispatch(ProcessingsActions.Processings.Remove.exec({ label: `[${indexName}][${topic}] main$` })))
			),
		{ dispatch: true }
	);

	constructor(private actions$: Actions, private httpClient: HttpClient, private store: Store<{}>) {}

	private endpointGenerator() {
		return `assets/envs/libs/apps/embedded-device-manager/routes/routes/pouchdb-manager/routes/find-selectors/route/index.json`;
	}

	private httpHeadersConfigGenerator() {
		return <HttpHeadersConfig>{
			'Content-Type': 'application/json; charset=utf-8',
			Accept: 'application/json'
		};
	}

	private httpRequestParamsGenerator() {
		return <HttpRequestParams>{};
	}
}
