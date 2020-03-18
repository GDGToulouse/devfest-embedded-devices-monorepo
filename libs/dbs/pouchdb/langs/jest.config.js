module.exports = {
	name: 'dbs-pouchdb-langs',
	preset: '../../../../jest.config.js',
	transform: {
		'^.+\\.[tj]sx?$': 'ts-jest'
	},
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'html'],
	coverageDirectory: '../../../../coverage/libs/dbs/pouchdb/langs'
};
