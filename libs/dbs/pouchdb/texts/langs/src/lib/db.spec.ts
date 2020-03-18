import { dbsPouchdbTextsLangs } from './dbs-pouchdb-texts-langs';

describe('dbsPouchdbTextsLangs', () => {
	it('should work', () => {
		expect(dbsPouchdbTextsLangs()).toEqual('dbs-pouchdb-texts-langs');
	});
});
