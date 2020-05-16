module.exports = {
	name: 'components-terminal',
	preset: '../../../jest.config.js',
	coverageDirectory: '../../../coverage/libs/components/terminal',
	snapshotSerializers: ['jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js', 'jest-preset-angular/build/AngularSnapshotSerializer.js', 'jest-preset-angular/build/HTMLCommentSerializer.js']
};
