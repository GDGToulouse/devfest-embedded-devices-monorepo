module.exports = {
	name: 'embedded-devices-manager',
	preset: '../../jest.config.js',
	coverageDirectory: '../../coverage/apps/embedded-devices-manager',
	snapshotSerializers: ['jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js', 'jest-preset-angular/build/AngularSnapshotSerializer.js', 'jest-preset-angular/build/HTMLCommentSerializer.js']
};
