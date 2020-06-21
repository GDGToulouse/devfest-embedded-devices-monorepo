module.exports = {
	name: 'apis-metric-manager-client',
	preset: '../../../jest.config.js',
	testEnvironment: 'node',
	transform: {
		'^.+\\.[tj]sx?$': 'ts-jest'
	},
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'html'],
	coverageDirectory: '../../../coverage/libs/apis/metric-manager-client'
};
