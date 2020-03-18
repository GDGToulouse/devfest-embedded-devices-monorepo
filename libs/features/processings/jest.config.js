module.exports = {
	name: 'features-processings',
	preset: '../../../jest.config.js',
	coverageDirectory: '../../../coverage/libs/features/processings',
	snapshotSerializers: ['jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js', 'jest-preset-angular/build/AngularSnapshotSerializer.js', 'jest-preset-angular/build/HTMLCommentSerializer.js']
};
