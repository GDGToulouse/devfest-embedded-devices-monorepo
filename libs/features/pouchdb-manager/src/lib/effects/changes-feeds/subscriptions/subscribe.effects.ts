import { Actions as FeatureActions } from '../../../actions';
import { Selectors as FeatureSelectors } from '../../../selectors';
import { Injectable } from '@angular/core';
import { Actions as FeaturesLogsActions } from '@gdgtoulouse/features/logs';
import {
	Keys,
	LiveSinceLastSeqEmitsChange,
	LiveSinceLastSeqEmitsCompleteInfo,
	LiveSinceLastSeqEmitsError,
	Register,
	Since0EmitsChange,
	Since0EmitsCompleteInfo,
	Since0EmitsError,
	SocketEmitsHandleConnection,
	Start
	} from '@gdgtoulouse/structures/pouchdb-manager';
import {
	Actions,
	createEffect,
	ofType
	} from '@ngrx/effects';
import {
	Action,
	select,
	Store
	} from '@ngrx/store';
import {
	combineLatest,
	of
	} from 'rxjs';
import * as io from 'socket.io-client';
import {
	// catchError,
	switchMap,
	take,
	tap,
	withLatestFrom
} from 'rxjs/operators';

export const topic = 'changes-feeds-subscriptions-subscribe';

export interface ActiveListeners {
	[databaseConfigurationKey: string]: {
		changesFeeds: {
			[changesOptionsKey: string]: {
				destinations: {
					[destinationKey: string]: {};
				};
			};
		};
	};
}

@Injectable()
export class Effects {
	private hasAlreadyBeenConnected = false;
	private socket: SocketIOClient.Socket;

	//TODO: better way?
	initRequest$ = createEffect(
		() =>
			this.actions$.pipe(
				take(1),
				tap(() =>
					this.store.dispatch(
						FeatureActions.ChangesFeeds.Subscriptions.Socket.init({
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
							uri: 'http://localhost:8080/pouchdb-manager'
						})
					)
				)
			),
		{ dispatch: true }
	);

	init$ = createEffect(
		() =>
			combineLatest([this.actions$.pipe(ofType(FeatureActions.ChangesFeeds.Subscriptions.Socket.init))]).pipe(
				// tap(() => this.store.dispatch(ProcessingsActions.Processings.Add.exec({ label: `[${indexName}][${topic}] exec$` }))),
				switchMap(([{ listeners, opts, uri }]) => {
					this.socket = io(uri, opts);

					if (listeners.connect === true) {
						this.socket.on('connect', () => {
							if (this.hasAlreadyBeenConnected) {
								this.store.dispatch(FeaturesLogsActions.Core.Info.Add.action({ message: { text: 'reconnect' } }));
								this.store.dispatch(FeatureActions.ChangesFeeds.Subscriptions.Socket.reconnect());
							} else {
								this.store.dispatch(FeaturesLogsActions.Core.Info.Add.action({ message: { text: 'connect' } }));
								this.store.dispatch(FeatureActions.ChangesFeeds.Subscriptions.Socket.connect());
							}
							this.hasAlreadyBeenConnected = true;
						});
					}
					if (listeners.handleConnection === true) {
						this.socket.on('handleConnection', (socketEmitsHandleConnection: SocketEmitsHandleConnection) => {
							this.store.dispatch(FeaturesLogsActions.Core.Info.Add.action({ message: { text: 'handleConnection' } }));
							this.store.dispatch(FeatureActions.ChangesFeeds.Subscriptions.Socket.handleConnection({ socketEmitsHandleConnection }));
						});
					}
					if (listeners.exception === true) {
						this.socket.on('exception', (error) => {
							this.store.dispatch(FeaturesLogsActions.Core.Info.Add.action({ message: { text: 'exception' } }));
							this.store.dispatch(FeatureActions.ChangesFeeds.Subscriptions.Socket.exception({ error }));
						});
					}
					if (listeners.disconnect === true) {
						this.socket.on('disconnect', () => {
							this.store.dispatch(FeaturesLogsActions.Core.Info.Add.action({ message: { text: 'disconnect' } }));
							this.store.dispatch(FeatureActions.ChangesFeeds.Subscriptions.Socket.disconnect());
						});
					}
					if (listeners.since0Change === true) {
						this.socket.on('since0Change', (since0EmitsChange: Since0EmitsChange) => {
							this.store.dispatch(FeaturesLogsActions.Core.Info.Add.action({ message: { text: 'since0Change' } }));
							this.store.dispatch(FeatureActions.ChangesFeeds.Subscriptions.Socket.since0Change({ since0EmitsChange }));
						});
					}
					if (listeners.since0CompleteInfo === true) {
						this.socket.on('since0CompleteInfo', (since0EmitsCompleteInfo: Since0EmitsCompleteInfo) => {
							this.store.dispatch(FeaturesLogsActions.Core.Info.Add.action({ message: { text: 'since0CompleteInfo' } }));
							this.store.dispatch(FeatureActions.ChangesFeeds.Subscriptions.Socket.since0CompleteInfo({ since0EmitsCompleteInfo }));
						});
					}
					if (listeners.since0Error === true) {
						this.socket.on('since0Error', (since0EmitsError: Since0EmitsError) => {
							this.store.dispatch(FeaturesLogsActions.Core.Info.Add.action({ message: { text: 'since0Error' } }));
							this.store.dispatch(FeatureActions.ChangesFeeds.Subscriptions.Socket.since0Error({ since0EmitsError }));
						});
					}
					if (listeners.liveSinceLastSeqChange === true) {
						this.socket.on('liveSinceLastSeqChange', (liveSinceLastSeqEmitsChange: LiveSinceLastSeqEmitsChange) => {
							this.store.dispatch(FeaturesLogsActions.Core.Info.Add.action({ message: { text: 'liveSinceLastSeqChange' } }));
							this.store.dispatch(FeatureActions.ChangesFeeds.Subscriptions.Socket.liveSinceLastSeqChange({ liveSinceLastSeqEmitsChange }));
						});
					}
					if (listeners.liveSinceLastSeqCompleteInfo === true) {
						this.socket.on('liveSinceLastSeqCompleteInfo', (liveSinceLastSeqEmitsCompleteInfo: LiveSinceLastSeqEmitsCompleteInfo) => {
							this.store.dispatch(FeaturesLogsActions.Core.Info.Add.action({ message: { text: 'liveSinceLastSeqCompleteInfo' } }));
							this.store.dispatch(FeatureActions.ChangesFeeds.Subscriptions.Socket.liveSinceLastSeqCompleteInfo({ liveSinceLastSeqEmitsCompleteInfo }));
						});
					}
					if (listeners.liveSinceLastSeqError === true) {
						this.socket.on('liveSinceLastSeqError', (liveSinceLastSeqEmitsError: LiveSinceLastSeqEmitsError) => {
							this.store.dispatch(FeaturesLogsActions.Core.Info.Add.action({ message: { text: 'liveSinceLastSeqError' } }));
							this.store.dispatch(FeatureActions.ChangesFeeds.Subscriptions.Socket.liveSinceLastSeqError({ liveSinceLastSeqEmitsError }));
						});
					}
					return of(FeatureActions.ChangesFeeds.Subscriptions.Socket.initSucceeded());
				})
				// tap(() => this.store.dispatch(ProcessingsActions.Processings.Remove.exec({ label: `[${indexName}][${topic}] exec$` }))),
				// catchError((failure) => of(FeatureActions.ChangesFeeds.Subscriptions.Socket.initFailed({ failure })))
			),
		{ dispatch: true }
	);

	reconnect$ = createEffect(
		() =>
			combineLatest([this.actions$.pipe(ofType(FeatureActions.ChangesFeeds.Subscriptions.Socket.reconnect))]).pipe(
				// tap(() => this.store.dispatch(ProcessingsActions.Processings.Add.exec({ label: `[${indexName}][${topic}] exec$` }))),
				withLatestFrom(this.store.pipe(select(FeatureSelectors.getKeysInterpretationAtDestinationList$))),
				switchMap(([[_], getKeysInterpretationAtDestinationList]) => {
					getKeysInterpretationAtDestinationList({ destination: '' }).forEach((databaseConfigurationAndChangesOptionsAndDestination) => {
						this.socket.emit('since0', databaseConfigurationAndChangesOptionsAndDestination, 0, (keys: Keys) => {
							this.store.dispatch(FeatureActions.ChangesFeeds.Subscriptions.Socket.reconnectSucceeded({ keys }));
						});
					});
					return of(FeatureActions.ChangesFeeds.Subscriptions.Socket.reconnectRequested());
				})
				// tap(() => this.store.dispatch(ProcessingsActions.Processings.Remove.exec({ label: `[${indexName}][${topic}] exec$` }))),
				// catchError((failure) => of(FeatureActions.ChangesFeeds.Subscriptions.Socket.reconnectFailed({ failure })))
			),
		{ dispatch: true }
	);

	register$ = createEffect(
		() =>
			combineLatest([this.actions$.pipe(ofType(FeatureActions.ChangesFeeds.Subscriptions.Socket.register))]).pipe(
				// tap(() => this.store.dispatch(ProcessingsActions.Processings.Add.exec({ label: `[${indexName}][${topic}] exec$` }))),
				switchMap(
					([
						{
							request: { databaseConfiguration, destination, changesOptions, listeners }
						}
					]) => {
						const register: Register = {
							databaseConfiguration,
							changesOptions
						};
						this.socket.emit('register', register, 0, (keys: Keys) => {
							this.store.dispatch(FeatureActions.ChangesFeeds.Subscriptions.Socket.registerSucceeded({ databaseConfiguration, destination, changesOptions, listeners, ...keys }));
						});
						return of(FeatureActions.ChangesFeeds.Subscriptions.Socket.registerEmitted());
					}
				)
				// tap(() => this.store.dispatch(ProcessingsActions.Processings.Remove.exec({ label: `[${indexName}][${topic}] exec$` }))),
				// catchError((failure) => of(FeatureActions.ChangesFeeds.Subscriptions.Socket.registerFailed({ failure })))
			),
		{ dispatch: true }
	);

	registerSucceeded$ = createEffect(
		() =>
			combineLatest([this.actions$.pipe(ofType(FeatureActions.ChangesFeeds.Subscriptions.Socket.registerSucceeded))]).pipe(
				// tap(() => this.store.dispatch(ProcessingsActions.Processings.Add.exec({ label: `[${indexName}][${topic}] exec$` }))),
				switchMap(([{ type, ...payload }]) => {
					return of(
						FeatureActions.ChangesFeeds.Subscriptions.Socket.addListeners({
							request: {
								...payload
							}
						})
					);
				})
				// tap(() => this.store.dispatch(ProcessingsActions.Processings.Remove.exec({ label: `[${indexName}][${topic}] exec$` }))),
				// catchError((failure) => of(FeatureActions.ChangesFeeds.Subscriptions.Socket.registerSucceededFailed({ failure })))
			),
		{ dispatch: true }
	);

	addListeners$ = createEffect(
		() =>
			combineLatest([this.actions$.pipe(ofType(FeatureActions.ChangesFeeds.Subscriptions.Socket.addListeners))]).pipe(
				// tap(() => this.store.dispatch(ProcessingsActions.Processings.Add.exec({ label: `[${indexName}][${topic}] exec$` }))),
				switchMap(
					([
						{
							request: { changesOptionsKey, databaseConfigurationKey, destination, listeners }
						}
					]) => {
						const listenersAreDefined = listeners !== undefined;
						if (listenersAreDefined) {
							Object.keys(listeners).forEach((listenerKey) => {
								this.socket.on(listenerKey, (data: object & Keys) => {
									const isConcernedByData = data.databaseConfigurationKey === databaseConfigurationKey && data.changesOptionsKey === changesOptionsKey;
									if (isConcernedByData) {
										const actions: Action[] = listeners[listenerKey](data);
										actions.forEach((action) => {
											this.store.dispatch(action);
										});
									}
								});
							});
						}
						return of(FeatureActions.ChangesFeeds.Subscriptions.Socket.addListenersSucceeded({ request: { changesOptionsKey, databaseConfigurationKey, destination, listeners } }));
					}
				)
				// tap(() => this.store.dispatch(ProcessingsActions.Processings.Remove.exec({ label: `[${indexName}][${topic}] exec$` }))),
				// catchError((failure) => of(FeatureActions.ChangesFeeds.Subscriptions.Socket.addListenersSucceededFailed({ failure })))
			),
		{ dispatch: true }
	);

	addListenersSucceeded$ = createEffect(
		() =>
			combineLatest([this.actions$.pipe(ofType(FeatureActions.ChangesFeeds.Subscriptions.Socket.addListenersSucceeded))]).pipe(
				// tap(() => this.store.dispatch(ProcessingsActions.Processings.Add.exec({ label: `[${indexName}][${topic}] exec$` }))),
				switchMap(([{ request }]) => {
					return of(FeatureActions.ChangesFeeds.Subscriptions.Socket.start({ request }));
				})
				// tap(() => this.store.dispatch(ProcessingsActions.Processings.Remove.exec({ label: `[${indexName}][${topic}] exec$` }))),
				// catchError((failure) => of(FeatureActions.ChangesFeeds.Subscriptions.Socket.addListenersSucceededFailed({ failure })))
			),
		{ dispatch: true }
	);

	start$ = createEffect(
		() =>
			combineLatest([this.actions$.pipe(ofType(FeatureActions.ChangesFeeds.Subscriptions.Socket.start))]).pipe(
				// tap(() => this.store.dispatch(ProcessingsActions.Processings.Add.exec({ label: `[${indexName}][${topic}] exec$` }))),
				switchMap(
					([
						{
							request: { databaseConfigurationKey, changesOptionsKey }
						}
					]) => {
						const start: Start = {
							databaseConfigurationKey,
							changesOptionsKey
						};
						this.socket.emit('start', start, 0, () => {
							this.store.dispatch(FeatureActions.ChangesFeeds.Subscriptions.Socket.startSucceeded());
						});
						return of(FeatureActions.ChangesFeeds.Subscriptions.Socket.startEmitted());
					}
				)
				// tap(() => this.store.dispatch(ProcessingsActions.Processings.Remove.exec({ label: `[${indexName}][${topic}] exec$` }))),
				// catchError((failure) => of(FeatureActions.ChangesFeeds.Subscriptions.Socket.startFailed({ failure })))
			),
		{ dispatch: true }
	);

	startSucceeded$ = createEffect(
		() =>
			combineLatest([this.actions$.pipe(ofType(FeatureActions.ChangesFeeds.Subscriptions.Socket.startSucceeded))]).pipe(
				// tap(() => this.store.dispatch(ProcessingsActions.Processings.Add.exec({ label: `[${indexName}][${topic}] exec$` }))),
				switchMap(([_]) => {
					return of(FeatureActions.ChangesFeeds.Subscriptions.Socket.subscribeSucceeded());
				})
				// tap(() => this.store.dispatch(ProcessingsActions.Processings.Remove.exec({ label: `[${indexName}][${topic}] exec$` }))),
				// catchError((failure) => of(FeatureActions.ChangesFeeds.Subscriptions.Socket.startSucceededFailed({ failure })))
			),
		{ dispatch: true }
	);

	subscribe$ = createEffect(
		() =>
			combineLatest([this.actions$.pipe(ofType(FeatureActions.ChangesFeeds.Subscriptions.Socket.initSucceeded)), this.actions$.pipe(ofType(FeatureActions.ChangesFeeds.Subscriptions.Socket.subscribe))]).pipe(
				// tap(() => this.store.dispatch(ProcessingsActions.Processings.Add.exec({ label: `[${indexName}][${topic}] exec$` }))),
				withLatestFrom(this.store.pipe(select(FeatureSelectors.getKeysInterpretationAtDestinationList$))),
				// filter(([_, isConnected]) => isConnected),
				switchMap(
					([
						[
							_,
							{
								request: { changesOptions, databaseConfiguration, destination, listeners }
							}
						],
						getKeysInterpretationAtDestinationList
					]) => {
						const keysInterpretationAtDestinationList = getKeysInterpretationAtDestinationList({ destination });
						const registerHasNotBeenDoneYet = keysInterpretationAtDestinationList.length === 0;
						if (registerHasNotBeenDoneYet) {
							return of(FeatureActions.ChangesFeeds.Subscriptions.Socket.register({ request: { destination, databaseConfiguration, changesOptions, listeners } }));
						} else {
							return of(FeatureActions.ChangesFeeds.Subscriptions.Socket.subscribeSucceeded());
						}
					}
				)
				// tap(() => this.store.dispatch(ProcessingsActions.Processings.Remove.exec({ label: `[${indexName}][${topic}] exec$` }))),
				// catchError((failure) => of(FeatureActions.ChangesFeeds.Subscriptions.Socket.subscribeFailed({ failure })))
			),
		{ dispatch: true }
	);

	constructor(private actions$: Actions, private store: Store<{}>) {}
}
