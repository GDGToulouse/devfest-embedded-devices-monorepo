import { Actions as FeatureActions } from '../../../actions';
import { Success as ChangesFeedsSubscriptionsExecSuccess } from '../../../actions/changes-feeds/subscriptions/exec.actions';
import { featureName } from '../../../feature.config';
import { Injectable } from '@angular/core';
import { Actions as ProcessingsActions } from '@gdgtoulouse/features/processings';
import {
	Actions,
	createEffect,
	ofType
	} from '@ngrx/effects';
import { Store } from '@ngrx/store';
import deepEqual from 'fast-deep-equal';
import Pouchdb from 'pouchdb';
import PouchFind from 'pouchdb-find';
import {
	combineLatest,
	of
	} from 'rxjs';
import {
	catchError,
	delay,
	switchMap,
	tap
	} from 'rxjs/operators';

Pouchdb.plugin(PouchFind);
Pouchdb.setMaxListeners(500);

export const topic = 'changes-feeds-subscriptions-subscribe';

@Injectable()
export class Effects {
	private databases: {
		[databaseConfigurationKey: string]: {
			database: PouchDB.Database;
			databaseConfiguration: PouchDB.Configuration.DatabaseConfiguration;
			changesFeeds: {
				[changesOptionsKey: string]: {
					changes: PouchDB.Core.Changes<{}>;
					changesOptions: PouchDB.Core.ChangesOptions;
					sync?: {
						changesOptions: PouchDB.Core.ChangesOptions;
						changes: PouchDB.Core.Changes<{}>;
					};
				};
			};
		};
	} = {};

	exec$ = createEffect(
		() =>
			combineLatest([this.actions$.pipe(ofType(FeatureActions.ChangesFeeds.Subscriptions.Exec.request))]).pipe(
				tap(() => this.store.dispatch(ProcessingsActions.add({ label: `[${featureName}][${topic}] exec$` }))),
				delay(20),
				switchMap(([{ changesOptions, databaseConfiguration, subscriber }]) => {
					const success: ChangesFeedsSubscriptionsExecSuccess = {
						changesOptionsKey: undefined,
						databaseConfigurationKey: undefined,
						subscriber
					};
					success['databaseConfigurationIsFromString'] = typeof databaseConfiguration === 'string';
					if (success['databaseConfigurationIsFromString']) {
						success['databaseConfigurationKey'] = <string>databaseConfiguration;
					} else {
						success['databaseConfigurationAsNotString'] = <PouchDB.Configuration.DatabaseConfiguration>databaseConfiguration;
						success['databaseConfigurationKeyFound'] = Object.keys(this.databases).find((key) => deepEqual(databaseConfiguration, this.databases[key].databaseConfiguration));
						success['databaseConfigurationKeyHasBeenFound'] = success['databaseConfigurationKeyFound'] !== undefined;
						if (success['databaseConfigurationKeyHasBeenFound']) {
							success['databaseConfigurationKey'] = success['databaseConfigurationKeyFound'];
						} else {
							success['databaseConfigurationKey'] = this.generateUniqueKey();
							this.databases[success['databaseConfigurationKey']] = {
								database: new Pouchdb(success['databaseConfigurationAsNotString'].name, { ...success['databaseConfigurationAsNotString'] }),
								databaseConfiguration: success['databaseConfigurationAsNotString'],
								changesFeeds: {}
							};
						}
					}
					success['changesOptionsIsFromString'] = typeof changesOptions === 'string';
					if (success['changesOptionsIsFromString']) {
						success['changesOptionsKey'] = <string>changesOptions;
						success['changesOptionsAsNotString'] = this.databases[success['databaseConfigurationKey']].changesFeeds[success['changesOptionsKey']].changesOptions;
						success['isNotSynced'] = !Object.keys(this.databases[success['databaseConfigurationKey']].changesFeeds[success['changesOptionsKey']]).includes('sync');
						if (success['isNotSynced']) {
							this.databases[success['databaseConfigurationKey']].changesFeeds[success['changesOptionsKey']].changes.cancel();
						}
					} else {
						success['changesOptionsAsNotString'] = <PouchDB.Core.ChangesOptions>changesOptions;
						success['changesOptionsKeyFound'] = Object.keys(this.databases[success['databaseConfigurationKey']].changesFeeds).find((key) => {
							return deepEqual(success['changesOptionsAsNotString'], this.databases[success['databaseConfigurationKey']].changesFeeds[key].changesOptions);
						});
						success['changesOptionsKeyHasBeenFound'] = success['changesOptionsKeyFound'] !== undefined;
						if (success['changesOptionsKeyHasBeenFound']) {
							success['changesOptionsKey'] = success['changesOptionsKeyFound'];
							success['isNotSynced'] = !Object.keys(this.databases[success['databaseConfigurationKey']].changesFeeds[success['changesOptionsKey']]).includes('sync');
							if (success['isNotSynced']) {
								this.databases[success['databaseConfigurationKey']].changesFeeds[success['changesOptionsKey']].changes.cancel();
							}
						} else {
							success['changesOptionsKey'] = this.generateUniqueKey();
						}
					}
					if (success['isNotSynced'] !== false) {
						this.databases[success['databaseConfigurationKey']].changesFeeds[success['changesOptionsKey']] = {
							changesOptions: success['changesOptionsAsNotString'],
							changes: this.databases[success['databaseConfigurationKey']].database
								.changes({ ...success['changesOptionsAsNotString'] })
								.on('change', (change) => {
									this.store.dispatch(
										FeatureActions.ChangesFeeds.Subscriptions.Exec.changesChange({
											changesOptionsKey: success['changesOptionsKey'],
											change,
											databaseConfigurationKey: success['databaseConfigurationKey']
										})
									);
								})
								.on('complete', (completeInfo) => {
									this.store.dispatch(
										FeatureActions.ChangesFeeds.Subscriptions.Exec.changesComplete({
											changesOptionsKey: success['changesOptionsKey'],
											completeInfo,
											databaseConfigurationKey: success['databaseConfigurationKey']
										})
									);
								})
								.on('error', (error) => {
									this.databases[success['databaseConfigurationKey']].changesFeeds[success['changesOptionsKey']].changes.cancel();
									this.store.dispatch(
										FeatureActions.ChangesFeeds.Subscriptions.Exec.changesError({
											changesOptionsKey: success['changesOptionsKey'],
											error,
											databaseConfigurationKey: success['databaseConfigurationKey']
										})
									);
								})
						};
					}
					return of(FeatureActions.ChangesFeeds.Subscriptions.Exec.success({ success }));
				}),
				tap(() => this.store.dispatch(ProcessingsActions.remove({ label: `[${featureName}][${topic}] exec$` }))),
				catchError((failure) => of(FeatureActions.ChangesFeeds.Subscriptions.Exec.failure({ failure })))
			),
		{ dispatch: true }
	);

	sync$ = createEffect(
		() =>
			combineLatest([this.actions$.pipe(ofType(FeatureActions.ChangesFeeds.Subscriptions.Sync.request))]).pipe(
				tap(() => this.store.dispatch(ProcessingsActions.add({ label: `[${featureName}][${topic}] sync$` }))),
				delay(20),
				switchMap(([{ changesOptions, databaseConfiguration, subscriber }]) => {
					const success: ChangesFeedsSubscriptionsExecSuccess = {
						changesOptionsKey: undefined,
						databaseConfigurationKey: undefined,
						subscriber
					};
					success['databaseConfigurationIsFromString'] = typeof databaseConfiguration === 'string';
					if (success['databaseConfigurationIsFromString']) {
						success['databaseConfigurationKey'] = <string>databaseConfiguration;
					} else {
						success['databaseConfigurationAsNotString'] = <PouchDB.Configuration.DatabaseConfiguration>databaseConfiguration;
						success['databaseConfigurationKeyFound'] = Object.keys(this.databases).find((key) => deepEqual(databaseConfiguration, this.databases[key].databaseConfiguration));
						success['databaseConfigurationKeyHasBeenFound'] = success['databaseConfigurationKeyFound'] !== undefined;
						if (success['databaseConfigurationKeyHasBeenFound']) {
							success['databaseConfigurationKey'] = success['databaseConfigurationKeyFound'];
						} else {
							success['databaseConfigurationKey'] = this.generateUniqueKey();
							this.databases[success['databaseConfigurationKey']] = {
								database: new Pouchdb(success['databaseConfigurationAsNotString'].name, { ...success['databaseConfigurationAsNotString'] }),
								databaseConfiguration: success['databaseConfigurationAsNotString'],
								changesFeeds: {}
							};
						}
					}
					success['changesOptionsIsFromString'] = typeof changesOptions === 'string';
					if (success['changesOptionsIsFromString']) {
						success['changesOptionsKey'] = <string>changesOptions;
						success['changesOptionsAsNotString'] = this.databases[success['databaseConfigurationKey']].changesFeeds[success['changesOptionsKey']].changesOptions;
						success['isNotSynced'] = !Object.keys(this.databases[success['databaseConfigurationKey']].changesFeeds[success['changesOptionsKey']]).includes('sync');
						if (success['isNotSynced']) {
							this.databases[success['databaseConfigurationKey']].changesFeeds[success['changesOptionsKey']].changes.cancel();
						}
					} else {
						success['changesOptionsAsNotString'] = { ...(<PouchDB.Core.ChangesOptions>changesOptions), since: 0 };
						success['changesOptionsKeyFound'] = Object.keys(this.databases[success['databaseConfigurationKey']].changesFeeds).find((key) => {
							return deepEqual(success['changesOptionsAsNotString'], this.databases[success['databaseConfigurationKey']].changesFeeds[key].changesOptions);
						});
						success['changesOptionsKeyHasBeenFound'] = success['changesOptionsKeyFound'] !== undefined;
						if (success['changesOptionsKeyHasBeenFound']) {
							success['changesOptionsKey'] = success['changesOptionsKeyFound'];
							success['isNotSynced'] = !Object.keys(this.databases[success['databaseConfigurationKey']].changesFeeds[success['changesOptionsKey']]).includes('sync');
							if (success['isNotSynced']) {
								this.databases[success['databaseConfigurationKey']].changesFeeds[success['changesOptionsKey']].changes.cancel();
							}
						} else {
							success['changesOptionsKey'] = this.generateUniqueKey();
						}
					}
					if (success['isNotSynced'] !== false) {
						this.databases[success['databaseConfigurationKey']].changesFeeds[success['changesOptionsKey']] = {
							changesOptions: success['changesOptionsAsNotString'],
							changes: this.databases[success['databaseConfigurationKey']].database
								.changes({ ...success['changesOptionsAsNotString'] })
								.on('change', (change) => {
									this.store.dispatch(
										FeatureActions.ChangesFeeds.Subscriptions.Sync.since0ChangesChange({
											changesOptionsKey: success['changesOptionsKey'],
											change,
											databaseConfigurationKey: success['databaseConfigurationKey']
										})
									);
								})
								.on('complete', (completeInfo) => {
									this.store.dispatch(
										FeatureActions.ChangesFeeds.Subscriptions.Sync.since0ChangesComplete({
											changesOptionsKey: success['changesOptionsKey'],
											completeInfo,
											databaseConfigurationKey: success['databaseConfigurationKey']
										})
									);
									success['changesOptionsLiveSinceLastSeq'] = { ...success['changesOptionsAsNotString'], live: true, since: completeInfo.last_seq };
									this.databases[success['databaseConfigurationKey']].changesFeeds[success['changesOptionsKey']].sync = {
										changesOptions: success['changesOptionsLiveSinceLastSeq'],
										changes: this.databases[success['databaseConfigurationKey']].database
											.changes({ ...success['changesOptionsLiveSinceLastSeq'] })
											.on('change', (liveSinceLastSeqChange) => {
												this.store.dispatch(
													FeatureActions.ChangesFeeds.Subscriptions.Sync.liveSinceLastSeqChangesChange({
														change: liveSinceLastSeqChange,
														changesOptionsKey: success['changesOptionsKey'],
														databaseConfigurationKey: success['databaseConfigurationKey']
													})
												);
											})
											.on('complete', (liveSinceLastSeqInfo) => {
												this.store.dispatch(
													FeatureActions.ChangesFeeds.Subscriptions.Sync.liveSinceLastSeqChangesComplete({
														completeInfo: liveSinceLastSeqInfo,
														changesOptionsKey: success['changesOptionsKey'],
														databaseConfigurationKey: success['databaseConfigurationKey']
													})
												);
											})
											.on('error', (liveSinceLastSeqError) => {
												this.store.dispatch(
													FeatureActions.ChangesFeeds.Subscriptions.Sync.liveSinceLastSeqChangesError({
														error: liveSinceLastSeqError,
														changesOptionsKey: success['changesOptionsKey'],
														databaseConfigurationKey: success['databaseConfigurationKey']
													})
												);
											})
									};
								})
								.on('error', (since0Error) => {
									this.store.dispatch(
										FeatureActions.ChangesFeeds.Subscriptions.Sync.since0ChangesError({
											error: since0Error,
											changesOptionsKey: success['changesOptionsKey'],
											databaseConfigurationKey: success['databaseConfigurationKey']
										})
									);
								})
						};
					}
					return of(FeatureActions.ChangesFeeds.Subscriptions.Sync.success({ success }));
				}),
				tap(() => this.store.dispatch(ProcessingsActions.remove({ label: `[${featureName}][${topic}] sync$` })))
			),
		{ dispatch: true }
	);

	constructor(private actions$: Actions, private store: Store<{}>) {}

	private generateUniqueKey() {
		const newDate = new Date();
		const year = newDate
			.getFullYear()
			.toString()
			.padStart(4, '0');
		const month = (newDate.getMonth() + 1).toString().padStart(2, '0'); //TODO: + 1 or not?
		const day = newDate
			.getDate()
			.toString()
			.padStart(2, '0');
		const hour = newDate
			.getHours()
			.toString()
			.padStart(2, '0');
		const minute = newDate
			.getMinutes()
			.toString()
			.padStart(2, '0');
		const second = newDate
			.getSeconds()
			.toString()
			.padStart(2, '0');
		const millisecond = newDate
			.getUTCMilliseconds()
			.toString()
			.padStart(3, '0');
		return `${year}${month}${day}${hour}${minute}${second}${millisecond}`;
	}
}
