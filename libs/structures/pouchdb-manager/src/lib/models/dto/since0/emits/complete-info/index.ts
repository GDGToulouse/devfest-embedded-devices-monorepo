import Pouchdb from 'pouchdb';
import { Keys } from '../../../../keys';

// useless except to prevent the import removal from vscode organize imports extension
type PouchdbType = typeof Pouchdb;

export type Since0EmitsCompleteInfo = Required<Keys> & { since0CompleteInfo: PouchDB.Core.ChangesResponse<{}> };
