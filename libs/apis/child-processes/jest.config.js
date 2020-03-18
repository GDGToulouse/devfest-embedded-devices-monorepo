module.exports = {
	name: 'apis-child-process',
	preset: '../../../jest.config.js',
	transform: {
		'^.+\\.[tj]sx?$': 'ts-jest'
	},
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'html'],
	coverageDirectory: '../../../coverage/libs/apis/child-process'
};
