import Pouchdb from 'pouchdb';

// useless except to prevent the import removal from vscode organize imports extension
type PouchdbType = typeof Pouchdb;

export interface RegisterChangesOptions {
	readonly include_docs?: boolean;
	readonly selector?: PouchDB.Find.Selector;
}
