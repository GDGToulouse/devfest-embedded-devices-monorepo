module.exports = {
	name: 'structures-metric-manager',
	preset: '../../../jest.config.js',
	transform: {
		'^.+\\.[tj]sx?$': 'ts-jest'
	},
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'html'],
	coverageDirectory: '../../../coverage/libs/structures/metric-manager'
};
