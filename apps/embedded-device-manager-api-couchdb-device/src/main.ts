import * as express from 'express';
import * as expressPouchDB from 'express-pouchdb';
import { readFileSync } from 'fs';
import * as PouchDBStatic from 'pouchdb';

const envs = JSON.parse(readFileSync(`${__dirname}/assets/envs/index.json`, 'utf8'));
const prefix = `${process.env.INIT_CWD}/${envs.subPath}`;

const app = express();

const pouchdbOnFs = PouchDBStatic.defaults({ prefix });
const expressPouchdbOptions = {
	configPath: `${prefix}/config.json`,
	logPath: `${prefix}/log.txt`
};
const pouchdbOnFsHandle = expressPouchDB(pouchdbOnFs, expressPouchdbOptions);

pouchdbOnFsHandle.couchConfig.set('admins', envs.admin.username, envs.admin.password, (error) => {
	console.log('device', "couchConfig.set('admins', ...)", { error });
});

app.use('', pouchdbOnFsHandle);

const databases: { [key: string]: PouchDB.Database<any> } = {};

databases['langs_local'] = new PouchDBStatic('langs_local', { prefix: envs.databases['langs_local'].subPath });
databases['langs_remote'] = new PouchDBStatic(envs.databases['langs_remote'].name, envs.databases['langs_remote'].options);
databases['langs_local'].replicate.from(databases['langs_remote'], { live: true, retry: true });

databases['texts_langs_local'] = new PouchDBStatic('texts_langs_local', { prefix: envs.databases['texts_langs_local'].subPath });
databases['texts_langs_remote'] = new PouchDBStatic(envs.databases['texts_langs_remote'].name, envs.databases['texts_langs_remote'].options);
databases['texts_langs_local'].replicate.from(databases['texts_langs_remote'], { live: true, retry: true });

const server = app.listen(envs.port);

server.on('error', (error) => {
	console.log('device', 'server', 'error', { error });
});
