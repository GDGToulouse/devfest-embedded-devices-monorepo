import Pouchdb from 'pouchdb';

// useless except to prevent the import removal from vscode organize imports extension
export type PouchdbType = typeof Pouchdb;

export interface PouchdbCompleteChangesRequest {
	changesOptions: PouchDB.Core.ChangesOptions | string;
	databaseConfiguration: PouchDB.Configuration.DatabaseConfiguration | string;
	subscriber: string;
}
