import { Actions as FeatureActions } from '../../../actions';
import { NotificationConfig } from '../../../models';
import { Injectable } from '@angular/core';
import {
	Actions,
	createEffect,
	ofType
	} from '@ngrx/effects';
import { Store } from '@ngrx/store';
import deepEqual from 'fast-deep-equal';
import Pouchdb from 'pouchdb';
import PouchAuthentication from 'pouchdb-authentication';
import PouchFind from 'pouchdb-find';
import {
	combineLatest,
	of
	} from 'rxjs';
import {
	catchError,
	delay,
	switchMap
	} from 'rxjs/operators';
import * as io from 'socket.io-client';

Pouchdb.plugin(PouchAuthentication);
Pouchdb.plugin(PouchFind);
Pouchdb.setMaxListeners(500);

export interface AuthWithUsernameOnly {
	auth?: {
		username?: string;
	};
}

export const topic = 'changes-feeds-subscriptions-subscribe';

@Injectable()
export class Effects {
	private databases: {
		[databaseConfigurationKey: string]: {
			database: PouchDB.Database;
			databaseConfiguration: Omit<PouchDB.Configuration.DatabaseConfiguration, 'auth'> & AuthWithUsernameOnly;
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
	private socket: SocketIOClient.Socket;

	socket$ = createEffect(
		() =>
			combineLatest([this.actions$.pipe(ofType(FeatureActions.ChangesFeeds.Subscriptions.Socket.subscribe))]).pipe(
				// tap(() => this.store.dispatch(ProcessingsActions.add({ label: `[${indexName}][${topic}] exec$` }))),
				delay(500),
				switchMap(
					([
						{
							subscriptionConfig: {
								changesOptions,
								databaseConfiguration,
								notifications,
								destinationList,
								io: { opts, uri }
							}
						}
					]) => {
						this.socket = io(uri);
						console.log(this.socket);
						this.socket.on('connect', () => {
							console.log('Connected');

							this.socket.emit(
								'subscribe',
								{
									changesOptions: { include_docs: true, feed: 'continuous', heartbeat: true, filter: { selector: { $and: [{ $or: [{ pid: { $eq: 'projects-com-gpio-configs' } }, { pid: { $eq: 'projects-com-gpio-executions' } }] }] } } },
									databaseConfiguration: { name: 'http://localhost:5000/menu-default', auth: { password: 'cloud', username: 'cloud' } },
									destinationList: [`route/sidenavs/start/menu`]
								},
								0,
								(response) => {
									console.log({ response });
								}
							);
						});
						this.socket.on('subscribe-success', (success) => {
							console.log('subscribe-success', { success });
						});
						this.socket.on('exception', (error) => {
							console.log('exception', { error });
						});
						this.socket.on('disconnect', () => {
							console.log('Disconnected');
						});
						return of({ type: 'noop' });
					}
				),
				// tap(() => this.store.dispatch(ProcessingsActions.remove({ label: `[${indexName}][${topic}] exec$` }))),
				catchError((failure) => of(FeatureActions.ChangesFeeds.Subscriptions.Exec.failure({ failure })))
			),
		{ dispatch: true }
	);

	exec$ = createEffect(
		() =>
			combineLatest([this.actions$.pipe(ofType(FeatureActions.ChangesFeeds.Subscriptions.Exec.subscribe))]).pipe(
				// tap(() => this.store.dispatch(ProcessingsActions.add({ label: `[${indexName}][${topic}] exec$` }))),
				delay(500),
				switchMap(
					([
						{
							subscriptionConfig: { changesOptions, databaseConfiguration, notifications, destinationList }
						}
					]) => {
						const isNotificationsSpecified = notifications !== undefined;
						const notificationConfig: NotificationConfig = {
							since0Change: undefined,
							changesOptionsAsNotString: undefined,
							changesOptionsIsFromString: undefined,
							changesOptionsKey: undefined,
							changesOptionsKeyFound: undefined,
							changesOptionsKeyHasBeenFound: undefined,
							completeInfo: undefined,
							databaseConfigurationAsNotString: undefined,
							databaseConfigurationIsFromString: undefined,
							databaseConfigurationKey: undefined,
							databaseConfigurationKeyFound: undefined,
							databaseConfigurationKeyHasBeenFound: undefined,
							error: undefined,
							isNotSynced: undefined,
							destinationList
						};
						notificationConfig['databaseConfigurationIsFromString'] = typeof databaseConfiguration === 'string';
						if (notificationConfig['databaseConfigurationIsFromString']) {
							notificationConfig['databaseConfigurationKey'] = <string>databaseConfiguration;
						} else {
							// keep only username for the auth part
							notificationConfig['databaseConfigurationAsNotString'] = { ...(<PouchDB.Configuration.DatabaseConfiguration>databaseConfiguration), auth: Object.keys(<PouchDB.Configuration.DatabaseConfiguration>databaseConfiguration).includes('auth') ? { username: (<PouchDB.Configuration.RemoteDatabaseConfiguration>databaseConfiguration).auth.username } : undefined };
							notificationConfig['databaseConfigurationKeyFound'] = Object.keys(this.databases).find((key) => deepEqual(databaseConfiguration, this.databases[key].databaseConfiguration));
							notificationConfig['databaseConfigurationKeyHasBeenFound'] = notificationConfig['databaseConfigurationKeyFound'] !== undefined;
							if (notificationConfig['databaseConfigurationKeyHasBeenFound']) {
								notificationConfig['databaseConfigurationKey'] = notificationConfig['databaseConfigurationKeyFound'];
							} else {
								notificationConfig['databaseConfigurationKey'] = this.generateUniqueKey();
								const databaseInstance = new Pouchdb(notificationConfig['databaseConfigurationAsNotString'].name, { ...notificationConfig['databaseConfigurationAsNotString'] });
								//todo variabilize maxListeners as databaseConfiguration
								databaseInstance.setMaxListeners(500);
								this.databases[notificationConfig['databaseConfigurationKey']] = {
									database: databaseInstance,
									databaseConfiguration: notificationConfig['databaseConfigurationAsNotString'],
									changesFeeds: {}
								};
							}
						}
						notificationConfig['changesOptionsIsFromString'] = typeof changesOptions === 'string';
						if (notificationConfig['changesOptionsIsFromString']) {
							notificationConfig['changesOptionsKey'] = <string>changesOptions;
							notificationConfig['changesOptionsAsNotString'] = this.databases[notificationConfig['databaseConfigurationKey']].changesFeeds[notificationConfig['changesOptionsKey']].changesOptions;
							notificationConfig['isNotSynced'] = !Object.keys(this.databases[notificationConfig['databaseConfigurationKey']].changesFeeds[notificationConfig['changesOptionsKey']]).includes('sync');
							if (notificationConfig['isNotSynced']) {
								this.databases[notificationConfig['databaseConfigurationKey']].changesFeeds[notificationConfig['changesOptionsKey']].changes.cancel();
							}
						} else {
							notificationConfig['changesOptionsAsNotString'] = <PouchDB.Core.ChangesOptions>changesOptions;
							notificationConfig['changesOptionsKeyFound'] = Object.keys(this.databases[notificationConfig['databaseConfigurationKey']].changesFeeds).find((key) => {
								return deepEqual(notificationConfig['changesOptionsAsNotString'], this.databases[notificationConfig['databaseConfigurationKey']].changesFeeds[key].changesOptions);
							});
							notificationConfig['changesOptionsKeyHasBeenFound'] = notificationConfig['changesOptionsKeyFound'] !== undefined;
							if (notificationConfig['changesOptionsKeyHasBeenFound']) {
								notificationConfig['changesOptionsKey'] = notificationConfig['changesOptionsKeyFound'];
								notificationConfig['isNotSynced'] = !Object.keys(this.databases[notificationConfig['databaseConfigurationKey']].changesFeeds[notificationConfig['changesOptionsKey']]).includes('sync');
								if (notificationConfig['isNotSynced']) {
									this.databases[notificationConfig['databaseConfigurationKey']].changesFeeds[notificationConfig['changesOptionsKey']].changes.cancel();
								}
							} else {
								notificationConfig['changesOptionsKey'] = this.generateUniqueKey();
							}
						}
						if (notificationConfig['isNotSynced'] !== false) {
							const isChangeListNotificationSpecified = isNotificationsSpecified && Object.keys(notifications).includes('changeList');
							const isCompleteListNotificationSpecified = isNotificationsSpecified && Object.keys(notifications).includes('completeList');
							const isErrorListNotificationSpecified = isNotificationsSpecified && Object.keys(notifications).includes('errorList');
							this.databases[notificationConfig['databaseConfigurationKey']].changesFeeds[notificationConfig['changesOptionsKey']] = {
								changesOptions: notificationConfig['changesOptionsAsNotString'],
								changes: this.databases[notificationConfig['databaseConfigurationKey']].database
									.changes({ ...notificationConfig['changesOptionsAsNotString'] })
									.on('change', (change) => {
										notificationConfig['change'] = change;
										this.store.dispatch(
											FeatureActions.ChangesFeeds.Subscriptions.Exec.changesChange({
												changesOptionsKey: notificationConfig['changesOptionsKey'],
												change,
												databaseConfigurationKey: notificationConfig['databaseConfigurationKey']
											})
										);
										if (isChangeListNotificationSpecified) {
											notifications.changeList.forEach((changeItem) => changeItem({ notificationConfig: { ...notificationConfig } }).forEach((action) => this.store.dispatch(action)));
										}
									})
									.on('complete', (completeInfo) => {
										notificationConfig['completeInfo'] = completeInfo;
										this.store.dispatch(
											FeatureActions.ChangesFeeds.Subscriptions.Exec.changesComplete({
												changesOptionsKey: notificationConfig['changesOptionsKey'],
												completeInfo,
												databaseConfigurationKey: notificationConfig['databaseConfigurationKey']
											})
										);
										if (isCompleteListNotificationSpecified) {
											notifications.completeList.forEach((completeItem) => completeItem({ notificationConfig: { ...notificationConfig } }).forEach((action) => this.store.dispatch(action)));
										}
									})
									.on('error', (error) => {
										notificationConfig['error'] = error;
										this.databases[notificationConfig['databaseConfigurationKey']].changesFeeds[notificationConfig['changesOptionsKey']].changes.cancel();
										this.store.dispatch(
											FeatureActions.ChangesFeeds.Subscriptions.Exec.changesError({
												changesOptionsKey: notificationConfig['changesOptionsKey'],
												error,
												databaseConfigurationKey: notificationConfig['databaseConfigurationKey']
											})
										);
										if (isErrorListNotificationSpecified) {
											notifications.errorList.forEach((errorItem) => errorItem({ notificationConfig: { ...notificationConfig } }).forEach((action) => this.store.dispatch(action)));
										}
									})
							};
						}
						return of(FeatureActions.ChangesFeeds.Subscriptions.Exec.success({ success: { changesOptionsKey: notificationConfig.changesOptionsKey, databaseConfigurationKey: notificationConfig.databaseConfigurationKey, destinationList: notificationConfig.destinationList } }));
					}
				),
				// tap(() => this.store.dispatch(ProcessingsActions.remove({ label: `[${indexName}][${topic}] exec$` }))),
				catchError((failure) => of(FeatureActions.ChangesFeeds.Subscriptions.Exec.failure({ failure })))
			),
		{ dispatch: true }
	);

	sync$ = createEffect(
		() =>
			combineLatest([this.actions$.pipe(ofType(FeatureActions.ChangesFeeds.Subscriptions.Sync.subscribe))]).pipe(
				// tap(() => this.store.dispatch(ProcessingsActions.add({ label: `[${indexName}][${topic}] sync$` }))),
				delay(500),
				switchMap(
					([
						{
							subscriptionConfig: { changesOptions, databaseConfiguration, notifications, destinationList }
						}
					]) => {
						const isNotificationsSpecified = notifications !== undefined;
						const notificationConfig: NotificationConfig = {
							since0Change: undefined,
							changesOptionsAsNotString: undefined,
							changesOptionsIsFromString: undefined,
							changesOptionsKey: undefined,
							changesOptionsKeyFound: undefined,
							changesOptionsKeyHasBeenFound: undefined,
							completeInfo: undefined,
							databaseConfigurationAsNotString: undefined,
							databaseConfigurationIsFromString: undefined,
							databaseConfigurationKey: undefined,
							databaseConfigurationKeyFound: undefined,
							databaseConfigurationKeyHasBeenFound: undefined,
							error: undefined,
							isNotSynced: undefined,
							destinationList
						};
						notificationConfig['databaseConfigurationIsFromString'] = typeof databaseConfiguration === 'string';
						if (notificationConfig['databaseConfigurationIsFromString']) {
							notificationConfig['databaseConfigurationKey'] = <string>databaseConfiguration;
						} else {
							notificationConfig['databaseConfigurationAsNotString'] = <PouchDB.Configuration.DatabaseConfiguration>databaseConfiguration;
							notificationConfig['databaseConfigurationKeyFound'] = Object.keys(this.databases).find((key) => deepEqual(databaseConfiguration, this.databases[key].databaseConfiguration));
							notificationConfig['databaseConfigurationKeyHasBeenFound'] = notificationConfig['databaseConfigurationKeyFound'] !== undefined;
							if (notificationConfig['databaseConfigurationKeyHasBeenFound']) {
								notificationConfig['databaseConfigurationKey'] = notificationConfig['databaseConfigurationKeyFound'];
							} else {
								notificationConfig['databaseConfigurationKey'] = this.generateUniqueKey();
								const databaseInstance = new Pouchdb(notificationConfig['databaseConfigurationAsNotString'].name, { ...notificationConfig['databaseConfigurationAsNotString'] });
								databaseInstance.setMaxListeners(500);
								this.databases[notificationConfig['databaseConfigurationKey']] = {
									database: databaseInstance,
									databaseConfiguration: notificationConfig['databaseConfigurationAsNotString'],
									changesFeeds: {}
								};
							}
						}
						notificationConfig['changesOptionsIsFromString'] = typeof changesOptions === 'string';
						if (notificationConfig['changesOptionsIsFromString']) {
							notificationConfig['changesOptionsKey'] = <string>changesOptions;
							notificationConfig['changesOptionsAsNotString'] = this.databases[notificationConfig['databaseConfigurationKey']].changesFeeds[notificationConfig['changesOptionsKey']].changesOptions;
							notificationConfig['isNotSynced'] = !Object.keys(this.databases[notificationConfig['databaseConfigurationKey']].changesFeeds[notificationConfig['changesOptionsKey']]).includes('sync');
							if (notificationConfig['isNotSynced']) {
								this.databases[notificationConfig['databaseConfigurationKey']].changesFeeds[notificationConfig['changesOptionsKey']].changes.cancel();
							}
						} else {
							notificationConfig['changesOptionsAsNotString'] = { ...(<PouchDB.Core.ChangesOptions>changesOptions), since: 0 };
							notificationConfig['changesOptionsKeyFound'] = Object.keys(this.databases[notificationConfig['databaseConfigurationKey']].changesFeeds).find((key) => {
								return deepEqual(notificationConfig['changesOptionsAsNotString'], this.databases[notificationConfig['databaseConfigurationKey']].changesFeeds[key].changesOptions);
							});
							notificationConfig['changesOptionsKeyHasBeenFound'] = notificationConfig['changesOptionsKeyFound'] !== undefined;
							if (notificationConfig['changesOptionsKeyHasBeenFound']) {
								notificationConfig['changesOptionsKey'] = notificationConfig['changesOptionsKeyFound'];
								notificationConfig['isNotSynced'] = !Object.keys(this.databases[notificationConfig['databaseConfigurationKey']].changesFeeds[notificationConfig['changesOptionsKey']]).includes('sync');
								if (notificationConfig['isNotSynced']) {
									this.databases[notificationConfig['databaseConfigurationKey']].changesFeeds[notificationConfig['changesOptionsKey']].changes.cancel();
								}
							} else {
								notificationConfig['changesOptionsKey'] = this.generateUniqueKey();
							}
						}
						if (notificationConfig['isNotSynced'] !== false) {
							const isChangeListNotificationSpecified = isNotificationsSpecified && Object.keys(notifications).includes('changeList');
							const isCompleteListNotificationSpecified = isNotificationsSpecified && Object.keys(notifications).includes('completeList');
							const isErrorListNotificationSpecified = isNotificationsSpecified && Object.keys(notifications).includes('errorList');

							const isLiveSinceLastSeqNotificationSpecified = isNotificationsSpecified && Object.keys(notifications).includes('sync');
							const isLiveSinceLastSeqChangeNotificationSpecified = isLiveSinceLastSeqNotificationSpecified && Object.keys(notifications.sync).includes('changeList');
							const isLiveSinceLastSeqCompleteNotificationSpecified = isLiveSinceLastSeqNotificationSpecified && Object.keys(notifications.sync).includes('completeList');
							const isLiveSinceLastSeqErrorNotificationSpecified = isLiveSinceLastSeqNotificationSpecified && Object.keys(notifications.sync).includes('errorList');
							this.databases[notificationConfig['databaseConfigurationKey']].changesFeeds[notificationConfig['changesOptionsKey']] = {
								changesOptions: notificationConfig['changesOptionsAsNotString'],
								changes: this.databases[notificationConfig['databaseConfigurationKey']].database
									.changes({ ...notificationConfig['changesOptionsAsNotString'] })
									.on('change', (since0Change) => {
										notificationConfig['since0Change'] = since0Change;
										this.store.dispatch(
											FeatureActions.ChangesFeeds.Subscriptions.Sync.since0ChangesChange({
												changesOptionsKey: notificationConfig['changesOptionsKey'],
												change: since0Change,
												databaseConfigurationKey: notificationConfig['databaseConfigurationKey']
											})
										);
										if (isChangeListNotificationSpecified) {
											notifications.changeList.forEach((changeItem) => changeItem({ notificationConfig: { ...notificationConfig } }).forEach((action) => this.store.dispatch(action)));
										}
									})
									.on('complete', (since0CompleteInfo) => {
										notificationConfig['since0CompleteInfo'] = since0CompleteInfo;
										this.store.dispatch(
											FeatureActions.ChangesFeeds.Subscriptions.Sync.since0ChangesComplete({
												changesOptionsKey: notificationConfig['changesOptionsKey'],
												completeInfo: since0CompleteInfo,
												databaseConfigurationKey: notificationConfig['databaseConfigurationKey']
											})
										);
										if (isCompleteListNotificationSpecified) {
											notifications.completeList.forEach((completeItem) => completeItem({ notificationConfig: { ...notificationConfig } }).forEach((action) => this.store.dispatch(action)));
										}

										notificationConfig['changesOptionsLiveSinceLastSeq'] = { ...notificationConfig['changesOptionsAsNotString'], live: true, since: since0CompleteInfo.last_seq };
										this.databases[notificationConfig['databaseConfigurationKey']].changesFeeds[notificationConfig['changesOptionsKey']].sync = {
											changesOptions: notificationConfig['changesOptionsLiveSinceLastSeq'],
											changes: this.databases[notificationConfig['databaseConfigurationKey']].database
												.changes({ ...notificationConfig['changesOptionsLiveSinceLastSeq'] })
												.on('change', (liveSinceLastSeqChange) => {
													notificationConfig['liveSinceLastSeqChange'] = liveSinceLastSeqChange;
													this.store.dispatch(
														FeatureActions.ChangesFeeds.Subscriptions.Sync.liveSinceLastSeqChangesChange({
															change: liveSinceLastSeqChange,
															changesOptionsKey: notificationConfig['changesOptionsKey'],
															databaseConfigurationKey: notificationConfig['databaseConfigurationKey']
														})
													);
													if (isLiveSinceLastSeqChangeNotificationSpecified) {
														notifications.sync.changeList.forEach((changeItem) => changeItem({ notificationConfig: { ...notificationConfig } }).forEach((action) => this.store.dispatch(action)));
													}
												})
												.on('complete', (liveSinceLastSeqInfo) => {
													notificationConfig['liveSinceLastSeqInfo'] = liveSinceLastSeqInfo;
													this.store.dispatch(
														FeatureActions.ChangesFeeds.Subscriptions.Sync.liveSinceLastSeqChangesComplete({
															completeInfo: liveSinceLastSeqInfo,
															changesOptionsKey: notificationConfig['changesOptionsKey'],
															databaseConfigurationKey: notificationConfig['databaseConfigurationKey']
														})
													);
													if (isLiveSinceLastSeqCompleteNotificationSpecified) {
														notifications.sync.completeList.forEach((completeItem) => completeItem({ notificationConfig: { ...notificationConfig } }).forEach((action) => this.store.dispatch(action)));
													}
												})
												.on('error', (liveSinceLastSeqError) => {
													notificationConfig['liveSinceLastSeqError'] = liveSinceLastSeqError;
													this.store.dispatch(
														FeatureActions.ChangesFeeds.Subscriptions.Sync.liveSinceLastSeqChangesError({
															error: liveSinceLastSeqError,
															changesOptionsKey: notificationConfig['changesOptionsKey'],
															databaseConfigurationKey: notificationConfig['databaseConfigurationKey']
														})
													);
													if (isLiveSinceLastSeqErrorNotificationSpecified) {
														notifications.sync.errorList.forEach((errorItem) => errorItem({ notificationConfig: { ...notificationConfig } }).forEach((action) => this.store.dispatch(action)));
													}
												})
										};
									})
									.on('error', (since0Error) => {
										this.store.dispatch(
											FeatureActions.ChangesFeeds.Subscriptions.Sync.since0ChangesError({
												error: since0Error,
												changesOptionsKey: notificationConfig['changesOptionsKey'],
												databaseConfigurationKey: notificationConfig['databaseConfigurationKey']
											})
										);
										if (isErrorListNotificationSpecified) {
											notifications.errorList.forEach((errorItem) => errorItem({ notificationConfig: { ...notificationConfig } }).forEach((action) => this.store.dispatch(action)));
										}
									})
							};
						}
						return of(FeatureActions.ChangesFeeds.Subscriptions.Sync.success({ success: { changesOptionsKey: notificationConfig.changesOptionsKey, databaseConfigurationKey: notificationConfig.databaseConfigurationKey, destinationList: notificationConfig.destinationList } }));
					}
				)
				// tap(() => this.store.dispatch(ProcessingsActions.remove({ label: `[${indexName}][${topic}] sync$` })))
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
