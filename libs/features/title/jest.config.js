module.exports = {
	name: 'features-title',
	preset: '../../../jest.config.js',
	coverageDirectory: '../../../coverage/libs/features/title',
	snapshotSerializers: ['jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js', 'jest-preset-angular/build/AngularSnapshotSerializer.js', 'jest-preset-angular/build/HTMLCommentSerializer.js']
};
