import Pouchdb from 'pouchdb';

// useless except to prevent the import removal from vscode organize imports extension
type PouchdbType = typeof Pouchdb;

export interface NotificationConfig {
	since0Change: PouchDB.Core.ChangesResponseChange<{}>;
	changesOptionsAsNotString: PouchDB.Core.ChangesOptions;
	changesOptionsIsFromString: boolean;
	changesOptionsKey: string;
	changesOptionsKeyFound: string;
	changesOptionsKeyHasBeenFound: boolean;
	completeInfo: PouchDB.Core.ChangesResponse<{}>;
	databaseConfigurationAsNotString: PouchDB.Configuration.DatabaseConfiguration;
	databaseConfigurationIsFromString: boolean;
	databaseConfigurationKey: string;
	databaseConfigurationKeyFound: string;
	databaseConfigurationKeyHasBeenFound: boolean;
	error: any;
	isNotSynced: boolean;
	destinationList: string[];
}
