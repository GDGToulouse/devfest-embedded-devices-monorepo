import {
	RegisterDto,
	StartDto
	} from '../models';
import {
	LiveSinceLastSeqEmitsChange,
	LiveSinceLastSeqEmitsCompleteInfo,
	LiveSinceLastSeqEmitsError,
	RegisterOut,
	Since0EmitsChange,
	Since0EmitsCompleteInfo,
	Since0EmitsError,
	Socket,
	StartOut
	} from '@gdgtoulouse/structures/pouchdb-manager';
import { Injectable } from '@nestjs/common';
import deepEqual from 'fast-deep-equal';
import Pouchdb from 'pouchdb';
import { v4 as uuid } from 'uuid';

Pouchdb.setMaxListeners(500);

@Injectable()
export class SocketService {
	register({ in: { changesOptions, databaseConfiguration }, socket }: { in: RegisterDto; socket: Socket }) {
		let databaseConfigurationKey: string;
		let changesOptionsKey: string;

		const databaseConfigurationKeyFound = Object.keys(socket.databases).find((key) => deepEqual({ name: databaseConfiguration.name }, { name: socket.databases[key].databaseConfiguration.name }));
		const databaseConfigurationKeyHasBeenFound = databaseConfigurationKeyFound !== undefined;
		if (databaseConfigurationKeyHasBeenFound) {
			databaseConfigurationKey = databaseConfigurationKeyFound;
		} else {
			databaseConfigurationKey = uuid();
			const databaseInstance = new Pouchdb(databaseConfiguration.name, { ...databaseConfiguration });
			databaseInstance.setMaxListeners(500);
			socket.databases[databaseConfigurationKey] = {
				database: databaseInstance,
				databaseConfiguration,
				changesFeeds: {}
			};
		}

		const changesOptionsKeyFound = Object.keys(socket.databases[databaseConfigurationKey].changesFeeds).find((key) => deepEqual(changesOptions, socket.databases[databaseConfigurationKey].changesFeeds[key].changesOptions));
		const changesOptionsKeyHasBeenFound = changesOptionsKeyFound !== undefined;
		if (changesOptionsKeyHasBeenFound) {
			changesOptionsKey = changesOptionsKeyFound;
		} else {
			changesOptionsKey = uuid();
			socket.databases[databaseConfigurationKey].changesFeeds[changesOptionsKey] = {
				changesOptions,
				listeners: {
					since0: null,
					liveSinceLastSeq: null
				}
			};
		}

		const out: RegisterOut = { databaseConfigurationKey, changesOptionsKey };
		return out;
	}

	start({ in: { changesOptionsKey, databaseConfigurationKey }, socket }: { in: StartDto; socket: Socket }) {
		// console.log('start', socket.databases[databaseConfigurationKey].databaseConfiguration.name, JSON.stringify(socket.databases[databaseConfigurationKey].changesFeeds[changesOptionsKey].changesOptions.selector));
		const since0ChangesOptions = { ...socket.databases[databaseConfigurationKey].changesFeeds[changesOptionsKey].changesOptions, include_docs: true, since: 0 };
		const since0Listener = socket.databases[databaseConfigurationKey].database.changes({ ...since0ChangesOptions });

		since0Listener.on('change', (since0Change) => {
			// console.log({ since0Change });
			const since0EmitsChange: Since0EmitsChange = {
				changesOptionsKey,
				databaseConfigurationKey,
				since0Change
			};
			socket.emit('since0Change', since0EmitsChange);
		});
		since0Listener.on('complete', (since0CompleteInfo) => {
			// console.log({ since0CompleteInfo });
			const since0EmitsCompleteInfo: Since0EmitsCompleteInfo = {
				changesOptionsKey,
				databaseConfigurationKey,
				since0CompleteInfo
			};
			socket.emit('since0CompleteInfo', since0EmitsCompleteInfo);

			const liveSinceLastSeqChangesOptions = { ...socket.databases[databaseConfigurationKey].changesFeeds[changesOptionsKey].changesOptions, include_docs: true, since: since0CompleteInfo.last_seq, live: true };
			const liveSinceLastSeqListener = (socket.databases[databaseConfigurationKey].changesFeeds[changesOptionsKey].listeners.liveSinceLastSeq = socket.databases[databaseConfigurationKey].database.changes({ ...liveSinceLastSeqChangesOptions }));

			liveSinceLastSeqListener.on('change', (liveSinceLastSeqChange) => {
				// console.log({ liveSinceLastSeqChange });
				const liveSinceLastSeqEmitsChange: LiveSinceLastSeqEmitsChange = {
					changesOptionsKey,
					databaseConfigurationKey,
					liveSinceLastSeqChange
				};
				socket.emit('liveSinceLastSeqChange', liveSinceLastSeqEmitsChange);
			});
			liveSinceLastSeqListener.on('complete', (liveSinceLastSeqCompleteInfo) => {
				// console.log({ liveSinceLastSeqCompleteInfo });
				const liveSinceLastSeqEmitsCompleteInfo: LiveSinceLastSeqEmitsCompleteInfo = {
					changesOptionsKey,
					databaseConfigurationKey,
					liveSinceLastSeqCompleteInfo
				};
				socket.emit('liveSinceLastSeqCompleteInfo', liveSinceLastSeqEmitsCompleteInfo);
			});
			liveSinceLastSeqListener.on('error', (liveSinceLastSeqError) => {
				// console.log({ liveSinceLastSeqError });
				const liveSinceLastSeqEmitsError: LiveSinceLastSeqEmitsError = {
					changesOptionsKey,
					databaseConfigurationKey,
					liveSinceLastSeqError
				};
				socket.emit('liveSinceLastSeqError', liveSinceLastSeqEmitsError);
			});

			socket.databases[databaseConfigurationKey].changesFeeds[changesOptionsKey].listeners.liveSinceLastSeq = liveSinceLastSeqListener;
		});
		since0Listener.on('error', (since0Error) => {
			// console.log({ since0Error });
			const since0EmitsError: Since0EmitsError = {
				changesOptionsKey,
				databaseConfigurationKey,
				since0Error
			};
			socket.emit('since0Error', since0EmitsError);
		});

		socket.databases[databaseConfigurationKey].changesFeeds[changesOptionsKey].listeners.since0 = since0Listener;

		const out: StartOut = {};
		return out;
	}
}
