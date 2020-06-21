module.exports = {
	name: 'apps-embedded-device-manager-api-nest-routes-route',
	preset: '../../../../../jest.config.js',
	testEnvironment: 'node',
	transform: {
		'^.+\\.[tj]sx?$': 'ts-jest'
	},
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'html'],
	coverageDirectory: '../../../../../coverage/libs/apps/embedded-device-manager-api-nest/routes/route'
};
