import {
	Actions as FeatureActions,
	LangMenuList as RouteLangMenuList
	} from '../../../actions';
import { indexName } from '../../../index.config';
import {
	HttpClient,
	HttpHeaders
	} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions as ProcessingsActions } from '@gdgtoulouse/features/processings';
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
	mapTo,
	skip,
	switchMap,
	takeUntil,
	tap
} from 'rxjs/operators';

export const topic = 'lang-menu-list-api-get';

@Injectable()
export class Effects {
	scheduler$ = createEffect(() => combineLatest([this.actions$.pipe(ofType(FeatureActions.Envs.Api.Get.response))]).pipe(mapTo(FeatureActions.LangMenuList.Api.Get.request())), { dispatch: true });

	main$ = createEffect(
		() =>
			combineLatest([this.actions$.pipe(ofType(FeatureActions.LangMenuList.Api.Get.request))]).pipe(
				tap(() => this.store.dispatch(ProcessingsActions.Processings.Add.exec({ label: `[${indexName}][${topic}] main$` }))),
				delay(20),
				switchMap(([_]) =>
					this.httpClient
						.request<RouteLangMenuList.Api.Get.Response>('GET', this.endpointGenerator(), {
							observe: 'response',
							headers: new HttpHeaders(this.httpHeadersConfigGenerator()),
							params: this.httpRequestParamsGenerator()
						})
						.pipe(
							takeUntil(this.actions$.pipe(ofType(FeatureActions.LangMenuList.Api.Get.request), skip(1))),
							map(({ body: response, headers: responseHeaders }) => FeatureActions.LangMenuList.Api.Get.response({ response }))
							// catchError((failure) => of(FeatureActions.LangMenuList.Api.Get.failure({ failure })))
						)
				),
				tap(() => this.store.dispatch(ProcessingsActions.Processings.Remove.exec({ label: `[${indexName}][${topic}] main$` })))
			),
		{ dispatch: true }
	);

	constructor(private actions$: Actions, private httpClient: HttpClient, private store: Store<{}>) {}

	private endpointGenerator() {
		return `api/lang-menus`;
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
