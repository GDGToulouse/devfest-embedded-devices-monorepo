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
	private databases: {
		[databaseConfigurationKey: string]: {
			database: PouchDB.Database;
			databaseConfiguration: PouchDB.Configuration.DatabaseConfiguration;
			changesFeeds: {
				[changesOptionsKey: string]: {
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

	execSubscribe$ = createEffect(
		() =>
			combineLatest([this.actions$.pipe(ofType(FeatureActions.ChangesFeeds.Subscriptions.Exec.subscribe))]).pipe(
				tap(() => this.store.dispatch(ProcessingsActions.add({ label: `[${featureName}][${topic}] execSubscribe$` }))),
				delay(20),
				switchMap(([{ changesOptions, databaseConfiguration, subscriber }]) => {
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
							databaseConfigurationKey = this.generateUniqueKey();
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
							changesOptionsKey = this.generateUniqueKey();
							const changesOptionsAsNotString = <PouchDB.Core.ChangesOptions>changesOptions;
							this.databases[databaseConfigurationKey].changesFeeds[changesOptionsKey] = {
								changesOptions: changesOptionsAsNotString,
								changeList: [],
								completeInfo: null,
								error: null,
								listener: this.databases[databaseConfigurationKey].database
									.changes(changesOptionsAsNotString)
									.on('change', (change) => {
										this.databases[databaseConfigurationKey].changesFeeds[changesOptionsKey].changeList.push(change);
										this.store.dispatch(
											FeatureActions.ChangesFeeds.Subscriptions.Exec.change({
												change,
												changesOptionsKey,
												databaseConfigurationKey,
												subscriber
											})
										);
									})
									.on('complete', (completeInfo) => {
										this.databases[databaseConfigurationKey].changesFeeds[changesOptionsKey].completeInfo = completeInfo;
										this.store.dispatch(
											FeatureActions.ChangesFeeds.Subscriptions.Exec.complete({
												changesOptionsKey,
												completeInfo,
												databaseConfigurationKey,
												subscriber
											})
										);
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

					return of({ type: 'noop' });
				}),
				tap(() => this.store.dispatch(ProcessingsActions.remove({ label: `[${featureName}][${topic}] exec$` })))
			),
		{ dispatch: true }
	);

	syncSubscribe$ = createEffect(
		() =>
			combineLatest([this.actions$.pipe(ofType(FeatureActions.ChangesFeeds.Subscriptions.Sync.subscribe))]).pipe(
				tap(() => this.store.dispatch(ProcessingsActions.add({ label: `[${featureName}][${topic}] syncSubscribe$` }))),
				delay(20),
				switchMap(([{ changesOptions, databaseConfiguration, subscriber }]) => {
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
							databaseConfigurationKey = this.generateUniqueKey();
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
							changesOptionsKey = this.generateUniqueKey();
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
										this.databases[databaseConfigurationKey].changesFeeds[changesOptionsKey].changeList.push(since0Change);
									})
									.on('complete', (since0Info) => {
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
													this.databases[databaseConfigurationKey].changesFeeds[changesOptionsKey].sync.changeList.push(liveSinceLastSeqChange);
												})
												.on('complete', (liveSinceLastSeqInfo) => {
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

					return of({ type: 'noop' });
				}),
				tap(() => this.store.dispatch(ProcessingsActions.remove({ label: `[${featureName}][${topic}] sync$` })))
			),
		{ dispatch: true }
	);

	constructor(private actions$: Actions, private store: Store<{}>) {}

	private generateUniqueKey() {
		const newDate = new Date();
		const year = this.pad(newDate.getFullYear().toString(), 4);
		const month = this.pad((newDate.getMonth() + 1).toString(), 2);
		const day = this.pad(newDate.getDate().toString(), 2);
		const hour = this.pad(newDate.getHours().toString(), 2);
		const minute = this.pad(newDate.getMinutes().toString(), 2);
		const second = this.pad(newDate.getSeconds().toString(), 2);
		const millisecond = this.pad(newDate.getUTCMilliseconds().toString(), 3);
		return `${year}${month}${day}${hour}${minute}${second}${millisecond}`;
	}

	private pad(date, size) {
		let paddedDate = date;
		while (paddedDate.length < size) {
			paddedDate = '0' + paddedDate;
		}
		return paddedDate;
	}
}
