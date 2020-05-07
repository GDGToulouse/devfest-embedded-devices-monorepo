# CHANGELOG

## Schematics applied

### 20200318

```sh
yarn run ng add @angular/material

yarn run ng generate @nrwl/node:library --publishable types

yarn run ng generate @nrwl/angular:library --style=scss --publishable processings --directory=features

yarn run ng generate @nrwl/node:library --publishable tree --directory=structures

yarn add --dev pouchdb-server

yarn run ng generate @nrwl/express:application embedded-device-manager-api-couchdb-cloud --directory=""
yarn run ng generate @nrwl/express:application embedded-device-manager-api-couchdb-device --directory=""

yarn run ng generate @nrwl/node:library langs --publishable --directory=dbs/pouchdb
yarn run ng generate @nrwl/node:library langs --publishable --directory=dbs/pouchdb/texts

yarn add --dev @nestjs/cli

yarn run ng add @nrwl/nest

yarn run ng generate @nrwl/nest:application embedded-device-manager-api-nest --frontend-project embedded-device-manager --directory=""

yarn run ng generate @nrwl/nest:library child-process --directory=apis
```

### 20200506


```
yarn run ng generate @nrwl/angular:library --style=scss --publishable route --directory=apps/embedded-device-manager/routes/routes/terminal


yarn run ng generate @nrwl/angular:library --style=scss --publishable route --directory=apps/embedded-device-manager/routes/routes/pouchdb-manager

yarn run ng generate @nrwl/angular:library --style=scss --publishable route --directory=apps/embedded-device-manager/routes/routes/pouchdb-manager/routes/changes-options

yarn run ng generate @nrwl/angular:library --style=scss --publishable route --directory=apps/embedded-device-manager/routes/routes/pouchdb-manager/routes/changes-feeds

yarn run ng generate @nrwl/angular:library --style=scss --publishable route --directory=apps/embedded-device-manager/routes/routes/pouchdb-manager/routes/database-configurations

yarn run ng generate @nrwl/angular:library --style=scss --publishable route --directory=apps/embedded-device-manager/routes/routes/pouchdb-manager/routes/find-selectors

yarn run ng generate @nrwl/angular:library --style=scss --publishable pouchdb-manager --directory=features
```
