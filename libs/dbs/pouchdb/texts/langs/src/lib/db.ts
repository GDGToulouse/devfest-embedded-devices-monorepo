import {} from 'pouchdb';

export interface Post {
	langId: string;
	sourceId: string;
	value: string;
}

export function update(database: PouchDB.Database) {
	const postList = [
		{
			langId: 'en',
			sourceId: 'en',
			value: 'English'
		},
		{
			langId: 'en',
			sourceId: 'fr',
			value: 'French'
		},
		{
			langId: 'fr',
			sourceId: 'en',
			value: 'Anglais'
		},
		{
			langId: 'fr',
			sourceId: 'fr',
			value: 'Fançais'
		}
	];
	postList.forEach((post) => {
		database
			.post<Post>(post)
			.then((success) => {
				console.log('libs/dbs/pouchdb/texts/langs', 'update', 'post', { success });
			})
			.catch((error) => {
				console.error('libs/dbs/pouchdb/texts/langs', 'update', 'post', { error });
			});
	});
}
