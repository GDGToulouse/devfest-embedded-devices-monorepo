module.exports = {
	name: 'apis-pouchdb-manager',
	preset: '../../../jest.config.js',
	testEnvironment: 'node',
	transform: {
		'^.+\\.[tj]sx?$': 'ts-jest'
	},
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'html'],
	coverageDirectory: '../../../coverage/libs/apis/pouchdb-manager'
};
