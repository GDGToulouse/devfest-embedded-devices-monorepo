import { Actions as FeatureActions } from '../../../actions';
import { indexName } from '../../../index.config';
import { Injectable } from '@angular/core';
import { Actions as PouchdbManagerActions } from '@gdgtoulouse/features/pouchdb-manager';
import { Actions as ProcessingsActions } from '@gdgtoulouse/features/processings';
import {
	Actions,
	createEffect,
	ofType
	} from '@ngrx/effects';
import { Store } from '@ngrx/store';
import Pouchdb from 'pouchdb';
import {
	combineLatest,
	of
	} from 'rxjs';
import {
	delay,
	switchMap,
	tap
	} from 'rxjs/operators';

// useless except to prevent the import removal from vscode organize imports extension
export type PouchdbType = typeof Pouchdb;

export const topic = 'changes-feeds-subscriptions-subscribe';

@Injectable()
export class Effects {
	main$ = createEffect(
		() =>
			combineLatest([this.actions$.pipe(ofType(FeatureActions.Ui.ExpansionPanel.Opened.exec))]).pipe(
				tap(() => this.store.dispatch(ProcessingsActions.add({ label: `[${indexName}][${topic}] main$` }))),
				delay(20),
				switchMap(([{ changesRequest, tree }]) =>
					of(
						PouchdbManagerActions.ChangesFeeds.Subscriptions.Sync.request(
							Object.keys(tree).includes('treeList')
								? { ...changesRequest }
								: {
										...changesRequest,
										changesOptions: {
											...(<PouchDB.Core.ChangesOptions>changesRequest.changesOptions),
											selector: {
												$or: tree.treeList.map(({ _id }) => ({ pid: { $eq: _id } }))
											}
										}
								  }
						)
					)
				),
				tap(() => this.store.dispatch(ProcessingsActions.remove({ label: `[${indexName}][${topic}] exec$` })))
			),
		{ dispatch: true }
	);

	constructor(private actions$: Actions, private store: Store<{}>) {}
}
