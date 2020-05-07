import { Actions as FeatureActions } from '../../../actions';
import { featureName } from '../../../feature.config';
import { Injectable } from '@angular/core';
import { Actions as ProcessingsActions } from '@gdgtoulouse/features/processings';
import {
	Actions,
	createEffect,
	ofType
	} from '@ngrx/effects';
import { Store } from '@ngrx/store';
import fastDeepEqual from 'fast-deep-equal';
import Pouchdb from 'pouchdb';
import PouchFind from 'pouchdb-find';
import {
	combineLatest,
	of
	} from 'rxjs';
import {
	delay,
	switchMap,
	tap
	} from 'rxjs/operators';

Pouchdb.plugin(PouchFind);
Pouchdb.setMaxListeners(500);

export const topic = 'changes-feeds-subscriptions-subscribe';

@Injectable()
export class Effects {
	private subscriptions: { [key: string]: { databaseConfigurationKey: string; changesOptionsKey: string } } = {};
	private databases: {
		[key: string]: {
			database: PouchDB.Database;
			databaseConfiguration: PouchDB.Configuration.DatabaseConfiguration;
			changesFeeds: {
				[key: string]: {
					changeList: PouchDB.Core.ChangesResponseChange<{}>[];
					changesOptions: PouchDB.Core.ChangesOptions;
					completeInfo: PouchDB.Core.ChangesResponse<{}>;
					error: any;
					listener: PouchDB.Core.Changes<{}>;
					subscriberList: string[];
					sync?: {
						changeList: PouchDB.Core.ChangesResponseChange<{}>[];
						changesOptions: PouchDB.Core.ChangesOptions;
						completeInfo: PouchDB.Core.ChangesResponse<{}>;
						error: any;
						listener: PouchDB.Core.Changes<{}>;
						subscriberList: string[];
					};
				};
			};
		};
	} = {};

	exec$ = createEffect(
		() =>
			combineLatest([this.actions$.pipe(ofType(FeatureActions.ChangesFeeds.Subscriptions.Subscribe.exec))]).pipe(
				tap(() => this.store.dispatch(ProcessingsActions.add({ label: `[${featureName}][${topic}] exec$` }))),
				delay(20),
				switchMap(([{ changesOptions, databaseConfiguration, subscriber }]) => {
					console.log({ databaseConfiguration, subscriber });
					let databaseConfigurationKey: string;
					const databaseConfigurationIsFromString = typeof databaseConfiguration === 'string';
					if (databaseConfigurationIsFromString) {
						databaseConfigurationKey = <string>databaseConfiguration;
						const databaseConfigurationExists = Object.keys(this.databases).includes(databaseConfigurationKey);
						if (!databaseConfigurationExists) {
							throw new Error(`Can not found a database configuration as string ${databaseConfigurationKey}`);
						}
					} else {
						const databaseConfigurationKeyFound = Object.keys(this.databases).find((key) => fastDeepEqual(databaseConfiguration, this.databases[key].databaseConfiguration));
						if (databaseConfigurationKeyFound !== undefined) {
							throw new Error(`The database configuration already exists, please use its reference key (${databaseConfigurationKeyFound}) instead of providing the object itself`);
						} else {
							const newDateForChangesOptions = new Date();
							databaseConfigurationKey = newDateForChangesOptions.toString() + newDateForChangesOptions.getUTCMilliseconds().toString();
							const databaseConfigurationAsNotString = <PouchDB.Configuration.DatabaseConfiguration>databaseConfiguration;
							let database: PouchDB.Database;
							database = new Pouchdb(databaseConfigurationAsNotString.name, databaseConfigurationAsNotString);
							this.databases[databaseConfigurationKey] = {
								database,
								databaseConfiguration: databaseConfigurationAsNotString,
								changesFeeds: {}
							};
						}
					}
					let changesOptionsKey: string;
					const changesOptionsIsFromString = typeof changesOptions === 'string';
					if (changesOptionsIsFromString) {
						changesOptionsKey = <string>changesOptions;
						const changesOptionsExists = Object.keys(this.databases[databaseConfigurationKey].changesFeeds).includes(changesOptionsKey);
						if (!changesOptionsExists) {
							throw new Error(`Can not found a changes options as string ${changesOptionsKey}`);
						}
					} else {
						const changesOptionsKeyFound = Object.keys(this.databases[databaseConfigurationKey].changesFeeds).find((key) => fastDeepEqual(changesOptions, this.databases[databaseConfigurationKey].changesFeeds[key].changesOptions));
						if (changesOptionsKeyFound !== undefined) {
							throw new Error(`The changes options already exists, please use its reference key (${changesOptionsKeyFound}) instead of providing the object itself`);
						} else {
							const newDateForChangesOptions = new Date();
							changesOptionsKey = newDateForChangesOptions.toString() + newDateForChangesOptions.getUTCMilliseconds().toString();
							const changesOptionsAsNotString = <PouchDB.Core.ChangesOptions>changesOptions;
							this.databases[databaseConfigurationKey].changesFeeds[changesOptionsKey] = {
								changesOptions: changesOptionsAsNotString,
								changeList: [],
								completeInfo: null,
								error: null,
								listener: this.databases[databaseConfigurationKey].database
									.changes(changesOptionsAsNotString)
									.on('change', (change) => {
										console.log('change', { change }, this.databases);
										this.databases[databaseConfigurationKey].changesFeeds[changesOptionsKey].changeList.push(change);
									})
									.on('complete', (info) => {
										console.log('complete', { info }, this.databases);
										this.databases[databaseConfigurationKey].changesFeeds[changesOptionsKey].completeInfo = info;
									})
									.on('error', (error) => {
										throw error;
									}),
								subscriberList: []
							};
						}
					}
					const hasAlreadySubscribed = this.databases[databaseConfigurationKey].changesFeeds[changesOptionsKey].subscriberList.includes(subscriber);
					if (hasAlreadySubscribed) {
						throw new Error(`Subscriber (${subscriber}) already subscribed to changes`);
					} else {
						this.databases[databaseConfigurationKey].changesFeeds[changesOptionsKey].subscriberList.push(subscriber);
					}
					this.subscriptions[subscriber] = { databaseConfigurationKey, changesOptionsKey };
					console.log(this.databases, this.subscriptions);

					return of({ type: 'noop' });
				}),
				tap(() => this.store.dispatch(ProcessingsActions.remove({ label: `[${featureName}][${topic}] exec$` })))
			),
		{ dispatch: true }
	);

	sync$ = createEffect(
		() =>
			combineLatest([this.actions$.pipe(ofType(FeatureActions.ChangesFeeds.Subscriptions.Subscribe.sync))]).pipe(
				tap(() => this.store.dispatch(ProcessingsActions.add({ label: `[${featureName}][${topic}] sync$` }))),
				delay(20),
				switchMap(([{ changesOptions, databaseConfiguration, subscriber }]) => {
					console.log({ databaseConfiguration, subscriber });
					let databaseConfigurationKey: string;
					const databaseConfigurationIsFromString = typeof databaseConfiguration === 'string';
					if (databaseConfigurationIsFromString) {
						databaseConfigurationKey = <string>databaseConfiguration;
						const databaseConfigurationExists = Object.keys(this.databases).includes(databaseConfigurationKey);
						if (!databaseConfigurationExists) {
							throw new Error(`Can not found a database configuration as string ${databaseConfigurationKey}`);
						}
					} else {
						const databaseConfigurationKeyFound = Object.keys(this.databases).find((key) => fastDeepEqual(databaseConfiguration, this.databases[key].databaseConfiguration));
						if (databaseConfigurationKeyFound !== undefined) {
							throw new Error(`The database configuration already exists, please use its reference key (${databaseConfigurationKeyFound}) instead of providing the object itself`);
						} else {
							const newDateForChangesOptions = new Date();
							databaseConfigurationKey = newDateForChangesOptions.toString() + newDateForChangesOptions.getUTCMilliseconds().toString();
							const databaseConfigurationAsNotString = <PouchDB.Configuration.DatabaseConfiguration>databaseConfiguration;
							let database: PouchDB.Database;
							database = new Pouchdb(databaseConfigurationAsNotString.name, databaseConfigurationAsNotString);
							this.databases[databaseConfigurationKey] = {
								database,
								databaseConfiguration: databaseConfigurationAsNotString,
								changesFeeds: {}
							};
						}
					}
					let changesOptionsKey: string;
					const changesOptionsIsFromString = typeof changesOptions === 'string';
					if (changesOptionsIsFromString) {
						changesOptionsKey = <string>changesOptions;
						const changesOptionsExists = Object.keys(this.databases[databaseConfigurationKey].changesFeeds).includes(changesOptionsKey);
						if (!changesOptionsExists) {
							throw new Error(`Can not found a changes options as string ${changesOptionsKey}`);
						}
					} else {
						const changesOptionsKeyFound = Object.keys(this.databases[databaseConfigurationKey].changesFeeds).find((key) => fastDeepEqual(changesOptions, this.databases[databaseConfigurationKey].changesFeeds[key].changesOptions));
						if (changesOptionsKeyFound !== undefined) {
							throw new Error(`The changes options already exists, please use its reference key (${changesOptionsKeyFound}) instead of providing the object itself`);
						} else {
							const newDateForChangesOptions = new Date();
							changesOptionsKey = newDateForChangesOptions.toString() + newDateForChangesOptions.getUTCMilliseconds().toString();
							const changesOptionsAsNotString = <PouchDB.Core.ChangesOptions>changesOptions;
							const changesOptionsSince0 = { ...changesOptionsAsNotString, since: 0 };
							this.databases[databaseConfigurationKey].changesFeeds[changesOptionsKey] = {
								changesOptions: changesOptionsSince0,
								changeList: [],
								completeInfo: null,
								error: null,
								listener: this.databases[databaseConfigurationKey].database
									.changes(changesOptionsSince0)
									.on('change', (since0Change) => {
										console.log('change', { since0Change }, this.databases);
										this.databases[databaseConfigurationKey].changesFeeds[changesOptionsKey].changeList.push(since0Change);
									})
									.on('complete', (since0Info) => {
										console.log('complete', { since0Info }, this.databases);
										this.databases[databaseConfigurationKey].changesFeeds[changesOptionsKey].completeInfo = since0Info;
										const changesOptionsLiveSinceLastSeq = { ...changesOptionsAsNotString, live: true, since: since0Info.last_seq };

										this.databases[databaseConfigurationKey].changesFeeds[changesOptionsKey].sync = {
											changesOptions: changesOptionsLiveSinceLastSeq,
											changeList: [],
											completeInfo: null,
											error: null,
											listener: this.databases[databaseConfigurationKey].database
												.changes(changesOptionsLiveSinceLastSeq)
												.on('change', (liveSinceLastSeqChange) => {
													console.log('change', { liveSinceLastSeqChange }, this.databases);
													this.databases[databaseConfigurationKey].changesFeeds[changesOptionsKey].sync.changeList.push(liveSinceLastSeqChange);
												})
												.on('complete', (liveSinceLastSeqInfo) => {
													console.log('complete', { liveSinceLastSeqInfo }, this.databases);
													this.databases[databaseConfigurationKey].changesFeeds[changesOptionsKey].sync.completeInfo = liveSinceLastSeqInfo;
												})
												.on('error', (liveSinceLastSeqError) => {
													throw liveSinceLastSeqError;
												}),
											subscriberList: []
										};
									})
									.on('error', (since0Error) => {
										throw since0Error;
									}),
								subscriberList: []
							};
						}
					}
					const hasAlreadySubscribed = this.databases[databaseConfigurationKey].changesFeeds[changesOptionsKey].subscriberList.includes(subscriber);
					if (hasAlreadySubscribed) {
						throw new Error(`Subscriber (${subscriber}) already subscribed to changes`);
					} else {
						this.databases[databaseConfigurationKey].changesFeeds[changesOptionsKey].subscriberList.push(subscriber);
					}
					this.subscriptions[subscriber] = { databaseConfigurationKey, changesOptionsKey };
					console.log(this.databases, this.subscriptions);

					return of({ type: 'noop' });
				}),
				tap(() => this.store.dispatch(ProcessingsActions.remove({ label: `[${featureName}][${topic}] sync$` })))
			),
		{ dispatch: true }
	);

	constructor(private actions$: Actions, private store: Store<{}>) {}
}
