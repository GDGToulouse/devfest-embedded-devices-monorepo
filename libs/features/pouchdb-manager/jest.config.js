module.exports = {
	name: 'features-pouchdb-manager',
	preset: '../../../jest.config.js',
	coverageDirectory: '../../../coverage/libs/features/pouchdb-manager',
	snapshotSerializers: ['jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js', 'jest-preset-angular/build/AngularSnapshotSerializer.js', 'jest-preset-angular/build/HTMLCommentSerializer.js']
};
