module.exports = {
  name: "embedded-device-manager",
  preset: "../../jest.config.js",
  coverageDirectory: "../../coverage/apps/embedded-device-manager",
  snapshotSerializers: [
    "jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js",
    "jest-preset-angular/build/AngularSnapshotSerializer.js",
    "jest-preset-angular/build/HTMLCommentSerializer.js"
  ]
};
