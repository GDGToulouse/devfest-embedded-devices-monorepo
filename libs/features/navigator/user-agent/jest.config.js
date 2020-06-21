module.exports = {
	name: 'features-navigator-user-agent',
	preset: '../../../../jest.config.js',
	coverageDirectory: '../../../../coverage/libs/features/navigator/user-agent',
	snapshotSerializers: ['jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js', 'jest-preset-angular/build/AngularSnapshotSerializer.js', 'jest-preset-angular/build/HTMLCommentSerializer.js']
};
