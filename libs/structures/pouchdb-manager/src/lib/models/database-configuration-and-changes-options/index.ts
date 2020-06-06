import { Register } from '../../models';
import Pouchdb from 'pouchdb';

// useless except to prevent the import removal from vscode organize imports extension
type PouchdbType = typeof Pouchdb;

export type DatabaseConfigurationAndChangesOptions = Pick<Register, 'databaseConfiguration' | 'changesOptions'>;
