# devfest-embedded-devices-monorepo

The monorepo to manage embedded devices we put in each room during the DevFest Toulouse, the devices are here to assist us during the event.

This project is actively developped by the DevFest Toulouse's organizers and by students of the Epitech Toulouse, this is a common project between the two structures (cf. [HUB project description](./docs/miscellaneous/epitech-project-description.md)).

## Features

### Countdown for speakers

The first goal of this project is to be able to inform speakers about the time left for their current talk. As organizers we also want to be able to monitor the time left in each room and eventually to adapt them in order to have a better crowd moves management.

### Faces counter

The second milestone will be to be able to estimate the number of people in the room, according to the data we sense in each of them (camera, sound, etc.)

## Architecture

[Here](./docs/architecture/general-schema.png) is a global schema of the architecture.

## Technologies

- [Angular](https://github.com/angular/angular)
- [Angular Material](https://github.com/angular/components)
- [Bash](http://git.savannah.gnu.org/cgit/bash.git) & [Ash - Busybox](https://git.busybox.net/busybox/)
- [Bitbake](https://github.com/openembedded/bitbake) & [Poky](https://github.com/jku/poky)
- [CouchDB](https://github.com/apache/couchdb)
- [Docker](https://github.com/docker/docker-ce)
- [Kubernetes](https://github.com/kubernetes/kubernetes)
- [K3s](https://github.com/rancher/k3s)
- [Nest.js](https://github.com/nestjs/nest)
- [Nginx](https://github.com/nginx/nginx)
- [Node.js](https://github.com/nodejs/node)
- [Nx](https://github.com/nrwl/nx)
- [OpenCV](https://github.com/opencv/opencv)
- [PouchDB](https://github.com/pouchdb/pouchdb) and [PouchDB Server](https://github.com/pouchdb/pouchdb-server)
- [Qemu](https://github.com/qemu/qemu)

## Run the project

### Platforms

For project is currently developped and tested under the following platforms (do not hesitate to contribute, adding the platform you use and submitting issues under your platform in case of troubles).

#### Ubuntu 18.04

- Node.js (version `13.11.0`)
- NPM (version `6.14.1`)
- Python (version `3.7.3`)
- Yarn (version `1.21.1`)

### Run all

Running `npm start` will run all the project parts (⚠️ there are many parts and nearly each of them has live-reload capability so this can cause memory and CPU drain, especially during the first build).

After the entire build is successful, you should be able to access the different parts:

Front-End:

- An Angular application served at [https://localhost:1111](https://localhost:1111)

Back-End:

- A Flask API served at [http://localhost:2222/api](http://localhost:2222/api)
- A Nest.js API served at [http://localhost:3333/api](http://localhost:3333/api)

Databases:

- A PouchDB server representing the cloud's database, served at [http://localhost:4444/_utils](http://localhost:4444/_utils). Login and password are both _cloud_ by default.
- A PouchDB server (CouchDB compatible NPM package) representing the embedded device's database, served at [http://localhost:5555/_utils](http://localhost:5555/_utils). Login and password are both _device_ by default.

**Note(s):**

- You can ignore the error which says `Error: ngcc is already running [...]`, this error is self resolved after a while and is due to TypeScript synchronous module resolution as several compilations are here run in parallel.

### Run independently

You can also specify which parts you want to run (you can also repeat this operation in different terminals in order to separate logs) like this:

- Front-End only:

```sh
npm run start:front
```

- Back-End Flask only:

```sh
npm run start:back:flask
```

- Back-End Nest.js only:

```sh
npm run start:back:nest
```

- Databases only (for the moment you can not separate the two databases because the embedded one will be pre-synced with the cloud one, this feature will eventually come in the future):

```sh
npm run start:dbs
```
