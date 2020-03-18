import {} from 'pouchdb';

export interface Put {
	_id: string;
	flag: string;
}

export function update(database: PouchDB.Database) {
	const putList = [
		{
			_id: 'en',
			flag: '🇬🇧'
		},
		{
			_id: 'fr',
			flag: '🇫🇷'
		}
	];
	putList.forEach((put) => {
		database
			.put<Put>(put)
			.then((success) => {
				console.log('libs/dbs/pouchdb/langs', 'update', 'put', { success });
			})
			.catch((error) => {
				console.error('libs/dbs/pouchdb/langs', 'update', 'put', { error });
			});
	});
}
