import { Actions as FeatureActions } from '../../actions';
import { Injectable } from '@angular/core';
import { Actions as FeaturesPouchdbManagerActions } from '@gdgtoulouse/features/pouchdb-manager';
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
	initRequest$ = createEffect(
		() =>
			combineLatest([this.actions$.pipe(ofType(FeatureActions.Envs.Api.Get.response))]).pipe(
				//tap(() => this.store.dispatch(ProcessingsActions.Processings.Add.exec({ label: `[${indexName}][${topic}] main$` }))),
				delay(20),
				switchMap(
					([
						{
							response: {
								devicePouchdbManagerSocket: { uri }
							}
						}
					]) => {
						return of(
							FeaturesPouchdbManagerActions.ChangesFeeds.Subscriptions.Socket.initRequest({
								listeners: {
									connect: true,
									disconnect: true,
									exception: true,
									handleConnection: true,
									liveSinceLastSeqChange: true,
									liveSinceLastSeqCompleteInfo: true,
									liveSinceLastSeqError: true,
									since0Change: true,
									since0CompleteInfo: true,
									since0Error: true
								},
								uri
							})
						);
					}
				)
			),
		{ dispatch: true }
	);
	constructor(private actions$: Actions, private store: Store<{}>) {}
}
