module.exports = {
	name: 'dbs-pouchdb-texts-langs',
	preset: '../../../../../jest.config.js',
	transform: {
		'^.+\\.[tj]sx?$': 'ts-jest'
	},
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'html'],
	coverageDirectory: '../../../../../coverage/libs/dbs/pouchdb/texts/langs'
};
