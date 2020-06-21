import { Keys } from '../../../../keys';
import Pouchdb from 'pouchdb';

// useless except to prevent the import removal from vscode organize imports extension
type PouchdbType = typeof Pouchdb;

export type LiveSinceLastSeqEmitsCompleteInfo = Required<Keys> & { liveSinceLastSeqCompleteInfo: PouchDB.Core.ChangesResponse<{}> };
