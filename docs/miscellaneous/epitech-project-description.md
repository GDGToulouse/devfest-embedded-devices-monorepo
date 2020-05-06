# Pack HUB

## Project identity

### How this project came out

DevFest Toulouse's organizers wanted to improve the way they manage the time left in each rooms. They studied what was done by other festivals and imagined their own version which requires help and that's why we met for this project.

### What are the projects' points of interests

The main goal of the project is to provide a complete system that will help DevFest Toulouse's organizers to manage the way they alert speakers that there is no time left for their current talk.
Side points of interests:

- To make from scratch a real hardware product with crafted software into and around it
- To discover how to make a custom Linux distribution
- To learn how to make a custom Access Point with Linux
- To leverage available and partition tolerant databases
- To use Docker as primary application system runner
- To play with highly wanted technologies and compose with highly valuable skills
- To be part of an Open Source project
- To deep dive in the local computer science ecosystem and network, working with the organizers of the biggest technical conference in Occitanie

## Project management

### Team (contributors)

DevFest Toulouse's organizers:

- [Hadrien TOMA](https://github.com/hadrien-toma) (@hadrien-toma)
- [Julien RENAUX](https://github.com/shprink) (@shprink)

Epitech managers:

- [Florian DAVASSE](https://github.com/aimbot31) (@aimbot31 - Tek 3)
- [Noé HEUILLET](https://github.com/nheuillet) (@nheuillet - Tek 2)

Epitech students:

- [Gianni SALINIERE-COURSY](https://github.com/giannisalinierecoursy) (@giannisalinierecoursy - Tek 2)
- [Guillaume BONNET](https://github.com/MrSquaare) (@MrSquaare - Tek 2)
- [Guillaume MAILHOL](https://github.com/Arcahub) (@Arcahub - Tek 1)
- [Jad CHAHED](https://github.com/Jad31) (@Jad31 - Tek 1)
- [Lucas MATHIEUX](https://github.com/Madfish5415) (@madfish5415 - Tek 2)
- [Mathias RESSORT](https://github.com/Ydos2) (@Ydos2 - Tek 1)
- [Mattéo FAUCHON](https://github.com/matteofauchon) (@matteofauchon - Tek 2)

### Organisation and tools

- The project will be drived by the DevFest Toulouse's organizers.
- There will be Agile's methods and Clean Code's good practices (Kanban, Issues, Scoring, Code Reviews, Deploy First, Quality First, DRY / WET, IaC, ...).

There will be teams:

- Hardware team: they deliver a deamon to the system team. This deamon serves an API to control and allow to monitor the hardware itself (Piezo, 7-segments, LEDs, Gyrophare and Camera).
- Back-end team: they deliver a Docker image packaging the API designed by the Front-End team, calling the server provided by the Hardware team.
- Front-End team: they deliver a Docker image to the system team as well as the interface contract for using it.
- System team: they deliver a Linux distribution running Docker and one of its orchestrators, they orchestrate the work of the other teams.

Each team will specify, develop, document, test, tag, release and deploy their own softwares and infra will always be considered as code. The DevOps and 3D case modelization's tasks will be cross-teams.

## Project functionnalities and qualities

### Requirements

- (must have) Provide an Access Point from the BeagleBone Black single board computer.
- (must have) Display a responsive front-end application on the previous Access Point
- (must have) Serve a back-end application on the previous Access Point

The previous architecture will be used to unlock the following features (these features will be usable in the front-end application)

#### Countdown parts (milestone 1.0.0)

- (must have) As an organizer, I want to be able to program the 7-segments displays and the progress bar of LEDs wired to the BeagleBone Black I am connected with, in order to start a count down from a given value (I also want to specify the blinking frequency curve to adopt during the count down).
- (must have) As an organizer, I want to be able to save presets of the previous settings and to label them in order to use them directly instead of re-setting the configuration manually.
- (nice to have) As an organizer, I want to add a setting specifying the state curve of the gyrophare during the count down.
- (nice to have) As an organizer, I want to add a setting specifying the state curve of the piezo during the count down.
- (nice to have) As an organizer, I want to access the value of each count downs of each room.

#### Camera part (milestone 2.0.0)

- (nice to have) As an organizer, I want to access the camera view in order to see the crowd and take pictures when I want (I also want to be able to share these pictures with Twitter application and Files application).
- (nice to have) As an organizer, I want to have an estimation about the number of attendees in the room (and to have an history of this number during the event) in order to be able to adapt the stream of people in the place.
- (nice to have) As an organizer, I want to be able to program, by time and by frequence, some events that will take a picture of the current moment and then tweet it.

### Who are the users

- DevFest Toulouse's organizers are the first end users but all the software will be Open Sourced and based on Open Hardware so available for everyone.
- We will directly interact with the DevFest Toulouse's organizers.

## Deployment

Languages and Protocols (not exhaustive nor fixed list):

- Bash & Ash
- HTTP & HTTPS
- I2C
- JavaScript
- Python
- PWM
- SPI
- UART
- YAML

### Production environment

#### Which platform or device will you product run on

- Locally: a BeagleBone Black on one side and a smarphone's browser on the other side.
- Cloudly: on GKE

#### How will you deploy your product on the target platform to make it accessible to users

By flashing SD cards, bundling all the needed softwares.

### Hardware and software

For a complete system including all options (prices are approximative):

| Description                                                       | Quantity | Unit price | Total   |
| ----------------------------------------------------------------- | -------- | ---------- | ------- |
| 3.5mm microphone                                                  |        1 |      2.50€ |   2.50€ |
| 3.5mm speaker                                                     |        1 |      4.40€ |   4.40€ |
| 7-Segment display red - 6.5"                                      |        4 |     25.00€ | 100.00€ |
| BeagleBone black rev C                                            |        1 |     70.00€ |  70.00€ |
| Camera module 1MP 30fps IR LED USB HD                             |        1 |     46.60€ |  46.60€ |
| Capacitive touch 7" screen Kuman LCD HDMI 800x480 with case stand |        1 |     70.00€ |  70.00€ |
| Case                                                              |        1 |            |         |
| Jumper wire - 0.1", 6-pin, 4"                                     |        4 |      0.90€ |   3.60€ |
| Jumper wires premium 6" M/F (pack of 10)                          |        1 |      3.70€ |   3.70€ |
| HUB USB 4 ports with power supply                                 |        1 |      6.70€ |   6.70€ |
| Large digit driver                                                |        4 |      7.40€ |  29.60€ |
| Male micro-HDMI through Female HDMI                               |        1 |      9.00€ |   9.00€ |
| MicroSDHC 16GB 98 Mo/s, class 10                                  |        1 |     10.70€ |  10.70€ |
| OpenMV H7 camera                                                  |        1 |     60.20€ |  60.20€ |
| USB external stereo 3D sound adapter                              |        1 |      6.00€ |   6.00€ |
| Vibration motor                                                   |        1 |      2.00€ |   2.00€ |
| Wi-Fi 150 Mbps USB adapter                                        |        1 |      5.70€ |   2.00€ |
| Universal USB gyrophare (random color)                            |        1 |      1.90€ |   1.90€ |

Shared accross all systems (prices are approximative):

| Description                                 | Quantity | Unit price | Total   |
| ------------------------------------------- | -------- | ---------- | ------- |
| High Temperature Adhesive Tape - (1cm, 33m) |        1 |      4.60€ |   4.60€ |
| Soldering iron and tin wire                 |          |            |         |

External software product and off-the-shelf softwares, not exhaustive nor fixed list, all FOSS, running in production on OSH:

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
