import Pouchdb from 'pouchdb';

// useless except to prevent the import removal from vscode organize imports extension
type PouchdbType = typeof Pouchdb;

export * from './destination';
export * from './init-socket-config';
export * from './keys-interpretation';
export * from './keys-interpretation-at-destination';
export * from './listeners';
export * from './socket-listeners';
export * from './subscribe-request';

export const isDocArchived = ({ doc }: { doc?: PouchDB.Core.ExistingDocument<PouchDB.Core.ChangesMeta> }) => Object.keys(doc).includes('archived') && doc['archived'] === true;
