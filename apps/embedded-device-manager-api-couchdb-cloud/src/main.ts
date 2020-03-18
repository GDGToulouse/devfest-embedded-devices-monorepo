import { update as dbsPouchdbLangsUpdate } from '@gdgtoulouse/dbs/pouchdb/langs';
import { update as dbsPouchdbTextsLangsUpdate } from '@gdgtoulouse/dbs/pouchdb/texts/langs';
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
	console.log('cloud', "couchConfig.set('admins', ...)", { error });
});

app.use('', pouchdbOnFsHandle);

const langsLocalDatabase = new PouchDBStatic('langs_local', {
	prefix: envs.databases['langs_local'].subPath,
	auth: envs.databases['langs_local'].auth
});
dbsPouchdbLangsUpdate(langsLocalDatabase);

const textLangsLocalDatabase = new PouchDBStatic('texts_langs_local', {
	prefix: envs.databases['texts_langs_local'].subPath,
	auth: envs.databases['texts_langs_local'].auth
});
dbsPouchdbTextsLangsUpdate(textLangsLocalDatabase);

const server = app.listen(envs.port);

server.on('error', (error) => {
	console.log('cloud', 'server', 'error', { error });
});
