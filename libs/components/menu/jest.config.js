module.exports = {
	name: 'components-menu',
	preset: '../../../jest.config.js',
	coverageDirectory: '../../../coverage/libs/components/menu',
	snapshotSerializers: ['jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js', 'jest-preset-angular/build/AngularSnapshotSerializer.js', 'jest-preset-angular/build/HTMLCommentSerializer.js']
};
