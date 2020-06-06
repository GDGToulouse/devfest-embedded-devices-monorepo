import {
	RegisterChangesOptions,
	RegisterDatabaseConfiguration
	} from '../../../dto';
import Pouchdb from 'pouchdb';

// useless except to prevent the import removal from vscode organize imports extension
type PouchdbType = typeof Pouchdb;

export interface DatabasesItem {
	database: PouchDB.Database;
	databaseConfiguration: RegisterDatabaseConfiguration;
	changesFeeds: {
		[changesOptionsKey: string]: {
			changesOptions: RegisterChangesOptions;
			listeners: {
				since0: PouchDB.Core.Changes<{}>;
				liveSinceLastSeq: PouchDB.Core.Changes<{}>;
			};
		};
	};
}
