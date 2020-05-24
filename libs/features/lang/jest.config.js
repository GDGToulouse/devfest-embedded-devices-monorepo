module.exports = {
	name: 'features-lang',
	preset: '../../../jest.config.js',
	coverageDirectory: '../../../coverage/libs/features/lang',
	snapshotSerializers: ['jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js', 'jest-preset-angular/build/AngularSnapshotSerializer.js', 'jest-preset-angular/build/HTMLCommentSerializer.js']
};
