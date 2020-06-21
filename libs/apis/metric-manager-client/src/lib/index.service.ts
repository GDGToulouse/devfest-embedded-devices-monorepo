import { Core } from './models';
import { SocketService } from './services/socket.service';
import {
	ClientSocket,
	Production,
	Record,
	RecordOut,
	SocketEmitsHandleConnection,
	SocketEmitsUpdateConfig,
	UpdateConfigOut
	} from '@gdgtoulouse/structures/metric-manager';
import {
	HttpService,
	Injectable
	} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { spawn } from 'child_process';
import sizeOf from 'object-sizeof';
import * as io from 'socket.io-client';
import { v4 as Uuid } from 'uuid';

//TODO create a lib for these constants
const NUMBER_OF_OCTETS_IN_ONE_KIBI_OCTET = 1024;
const NUMBER_OF_OCTETS_IN_ONE_MEBI_OCTET = 1048576;
const NUMBER_OF_OCTETS_IN_ONE_GIBI_OCTET = 1073741824;
const NUMBER_OF_OCTETS_IN_ONE_TEBI_OCTET = 1099511627776;

const NUMBER_OF_BITS_IN_ONE_OCTET = 8;
const NUMBER_OF_BITS_IN_ONE_KIBI_OCTET = 8192;
const NUMBER_OF_BITS_IN_ONE_MEBI_OCTET = 8388608;
const NUMBER_OF_BITS_IN_ONE_GIBI_OCTET = 8589934592;
const NUMBER_OF_BITS_IN_ONE_TEBI_OCTET = 8796093022208;

const NUMBER_OF_BITS_IN_ONE_KILO_BIT = 1000;
const NUMBER_OF_BITS_IN_ONE_MEGA_BIT = 1000000;
const NUMBER_OF_BITS_IN_ONE_GIGA_BIT = 1000000000;
const NUMBER_OF_BITS_IN_ONE_TERA_BIT = 1000000000000;

const NUMBER_OF_OCTETS_IN_ONE_KILO_OCTET = 1000;
const NUMBER_OF_OCTETS_IN_ONE_MEGA_OCTET = 1000000;
const NUMBER_OF_OCTETS_IN_ONE_GIGA_OCTET = 1000000000;
const NUMBER_OF_OCTETS_IN_ONE_TERA_OCTET = 1000000000000;

@Injectable()
export class IndexService {
	private uuid = Uuid();
	private date = Date.now();
	private core: Core;
	private hasAlreadyBeenConnected = false;
	private socket: ClientSocket;
	private sensorConfigProductionTimeoutList = [];
	private sensorConfigProductionIntervalList = [];
	private sensorConfigConsumptionTimeoutList = [];
	private sensorConfigConsumptionIntervalList = [];
	private productions: { [productionUuid: string]: Production } = {};
	private consumedProductions: { [recordUuid: string]: (Production & { productionUuid: string })[] } = {};
	private receivedProductions: { [recordUuid: string]: (Production & { productionUuid: string })[] } = {};

	constructor(private httpService: HttpService, private socketService: SocketService, private configService: ConfigService) {
		this.core = this.configService.get<Core>('libs.apis.metric-manager-client');
		this.core.productionConfigList.forEach(({ command, productionConfig }) => {
			const productionTimeout = setTimeout(() => {
				const productionInterval = setInterval(() => {
					const productionAllowed = this.canHandleMoreProduction();
					if (productionAllowed) {
						this.produce({ command });
					} else {
						this.logProductionStates();
					}
				}, productionConfig.repeat.time.afterPeriod);
				this.sensorConfigProductionIntervalList.push({ productionInterval });
			}, productionConfig.time.afterDelay);
			this.sensorConfigProductionTimeoutList.push({ productionTimeout });
		});

		const consumptionTimeout = setTimeout(() => {
			const consumptionInterval = setInterval(() => {
				if (this.socket.connected) {
					const recordUuid = Uuid();
					const recordDate = Date.now();
					this.fromProducedToConsumed({ consumptionListMaxLength: this.core.consumptionListMaxLength, recordUuid });
					const record: Record = {
						deploymentUuid: this.core.deploymentUuid,
						deploymentDate: this.core.deploymentDate,
						serviceUuid: this.uuid,
						serviceDate: this.date,
						recordUuid,
						recordDate,
						consumptionList: this.consumedProductions[recordUuid].map(({ process }) => process)
					};
					this.socket.emit('record', record, 0, (recordOut: RecordOut) => {
						this.fromConsumedToReceived(recordOut);
					});
				}
			}, this.core.consumptionConfig.repeat.time.afterPeriod);
			this.sensorConfigConsumptionIntervalList.push({ consumptionInterval });
		}, this.core.consumptionConfig.time.afterDelay);
		this.sensorConfigConsumptionTimeoutList.push({ consumptionTimeout });

		this.socket = Object.assign(io(this.core.metricManagerCloud.socket.uri, this.core.metricManagerCloud.socket.opts), { socketUuid: undefined });

		if (this.core.metricManagerCloud.listeners.connect === true) {
			this.socket.on('connect', () => {
				if (this.hasAlreadyBeenConnected) {
					this.socketService.reconnect();
				} else {
					this.socketService.connect();
				}
				const emit: SocketEmitsUpdateConfig = { deploymentUuid: this.core.deploymentUuid };
				this.socket.emit('update-config', emit, 0, (success: UpdateConfigOut) => {
					if (!success) {
						throw Error(`update-config was not a success ${JSON.stringify(emit)}`);
					}
				});
				this.hasAlreadyBeenConnected = true;
			});
		}
		if (this.core.metricManagerCloud.listeners.handleConnection === true) {
			this.socket.on('handleConnection', (socketEmitsHandleConnection: SocketEmitsHandleConnection) => {
				this.socketService.handleConnection({ socketEmitsHandleConnection });
			});
		}
		if (this.core.metricManagerCloud.listeners.exception === true) {
			this.socket.on('exception', (error) => {
				this.socketService.exception({ error });
			});
		}

		if (this.core.metricManagerCloud.listeners.updateConfig === true) {
			this.socket.on('update-config', (socketEmitsUpdateConfig: SocketEmitsUpdateConfig) => {
				this.socketService.updateConfig({ socketEmitsUpdateConfig });
			});
		}
		if (this.core.metricManagerCloud.listeners.connect_error) {
			this.socket.on('connect_error', (data) => {
				console.log('connect_error');
			});
		}
		if (this.core.metricManagerCloud.listeners.connect_timeout) {
			this.socket.on('connect_timeout', (data) => {
				console.log('connect_timeout');
			});
		}
		if (this.core.metricManagerCloud.listeners.connecting) {
			this.socket.on('connecting', (data) => {
				console.log('connecting');
			});
		}
		if (this.core.metricManagerCloud.listeners.disconnect) {
			this.socket.on('disconnect', (data) => {
				console.log('disconnect');
				this.socketService.disconnect();
			});
		}
		if (this.core.metricManagerCloud.listeners.error) {
			this.socket.on('error', (data) => {
				console.log('error');
			});
		}
		if (this.core.metricManagerCloud.listeners.reconnect) {
			this.socket.on('reconnect', (data) => {
				console.log('reconnect');
			});
		}
		if (this.core.metricManagerCloud.listeners.reconnect_attempt) {
			this.socket.on('reconnect_attempt', (data) => {
				console.log('reconnect_attempt');
			});
		}
		if (this.core.metricManagerCloud.listeners.reconnect_failed) {
			this.socket.on('reconnect_failed', (data) => {
				console.log('reconnect_failed');
			});
		}
		if (this.core.metricManagerCloud.listeners.reconnect_error) {
			this.socket.on('reconnect_error', (data) => {
				console.log('reconnect_error');
			});
		}
		if (this.core.metricManagerCloud.listeners.reconnecting) {
			this.socket.on('reconnecting', (data) => {
				console.log('reconnecting');
			});
		}
		if (this.core.metricManagerCloud.listeners.ping) {
			this.socket.on('ping', (data) => {
				console.log('ping');
			});
		}
		if (this.core.metricManagerCloud.listeners.pong) {
			this.socket.on('pong', (data) => {
				console.log('pong');
			});
		}

		if (this.core.metricManagerCloud.listeners.recordThen) {
			this.socket.on('record-then', ({ recordUuid }: { recordUuid: string }) => {
				this.fromReceivedToSaved({ recordUuid });
			});
		}
		if (this.core.metricManagerCloud.listeners.recordCatch) {
			this.socket.on('record-catch', ({ recordUuid }: { recordUuid: string }) => {
				this.fromReceivedToProduced({ recordUuid });
			});
		}
	}

	produce({ command }: { command: string }) {
		console.log('produce', { command });
		const processUuid = Uuid();
		this.productions[processUuid] = {
			process: {
				uuid: processUuid,
				date: Date.now(),
				events: {
					close: [],
					disconnect: [],
					error: [],
					exit: [],
					message: []
				},
				stdout: {
					close: [],
					data: [],
					end: [],
					error: [],
					pause: [],
					resume: []
				},
				stderr: {
					close: [],
					data: [],
					end: [],
					error: [],
					pause: [],
					resume: []
				}
			},
			spawned: null
		};
		const commandPartList = command.split(' ');
		this.productions[processUuid].spawned = spawn(commandPartList.shift(), commandPartList, { stdio: 'pipe' })
			.on('close', (data) => this.productions[processUuid].process.events.close.push({ data, uuid: Uuid(), date: Date.now() }))
			.on('disconnect', (disconnect) => this.productions[processUuid].process.events.disconnect.push(...this.formatString(disconnect.toString()).map((data) => ({ data, uuid: Uuid(), date: Date.now() }))))
			.on('error', (data) => this.productions[processUuid].process.events.error.push({ data, uuid: Uuid(), date: Date.now() }))
			.on('exit', (data) => this.productions[processUuid].process.events.exit.push({ data, uuid: Uuid(), date: Date.now() }))
			.on('message', (message) => this.productions[processUuid].process.events.message.push(...this.formatString(message.toString()).map((data) => ({ data, uuid: Uuid(), date: Date.now() }))));

		this.productions[processUuid].spawned.stdout.on('close', (data: boolean) => {
			return this.productions[processUuid].process.stdout['close'].push({ data, uuid: Uuid(), date: Date.now() });
		});
		this.productions[processUuid].spawned.stdout.on('data', (buffer: Buffer) => {
			return this.productions[processUuid].process.stdout['data'].push(...this.formatString(buffer.toString()).map((data) => ({ data, uuid: Uuid(), date: Date.now() })));
		});
		this.productions[processUuid].spawned.stdout.on('end', (data: undefined) => {
			return this.productions[processUuid].process.stdout['end'].push({ data, uuid: Uuid(), date: Date.now() });
		});
		this.productions[processUuid].spawned.stdout.on('error', (data) => {
			return this.productions[processUuid].process.stdout['error'].push({ data, uuid: Uuid(), date: Date.now() });
		});
		this.productions[processUuid].spawned.stdout.on('pause', (pause) => {
			return this.productions[processUuid].process.stdout['pause'].push(...this.formatString(pause.toString()).map((data) => ({ data, uuid: Uuid(), date: Date.now() })));
		});
		this.productions[processUuid].spawned.stdout.on('resume', (data: undefined) => {
			return this.productions[processUuid].process.stdout['resume'].push({ data, uuid: Uuid(), date: Date.now() });
		});

		this.productions[processUuid].spawned.stderr.on('close', (data: boolean) => {
			return this.productions[processUuid].process.stderr['close'].push({ data, uuid: Uuid(), date: Date.now() });
		});
		this.productions[processUuid].spawned.stderr.on('data', (buffer: Buffer) => {
			return this.productions[processUuid].process.stderr['data'].push(...this.formatString(buffer.toString()).map((data) => ({ data, uuid: Uuid(), date: Date.now() })));
		});
		this.productions[processUuid].spawned.stderr.on('end', (data: undefined) => {
			return this.productions[processUuid].process.stderr['end'].push({ data, uuid: Uuid(), date: Date.now() });
		});
		this.productions[processUuid].spawned.stderr.on('error', (data) => {
			return this.productions[processUuid].process.stderr['error'].push({ data, uuid: Uuid(), date: Date.now() });
		});
		this.productions[processUuid].spawned.stderr.on('pause', (pause) => {
			return this.productions[processUuid].process.stderr['pause'].push(...this.formatString(pause.toString()).map((data) => ({ data, uuid: Uuid(), date: Date.now() })));
		});
		this.productions[processUuid].spawned.stderr.on('resume', (data: undefined) => {
			return this.productions[processUuid].process.stderr['resume'].push({ data, uuid: Uuid(), date: Date.now() });
		});
		this.logProductionStates();
	}

	formatString(source: string) {
		const destinationList = [source]; // not sure if `source.replace(/\t/g, ' ').split('\n');` would be better, to study and comment according to study results
		return destinationList;
	}

	fromProducedToConsumed({ consumptionListMaxLength, recordUuid }: { consumptionListMaxLength: number; recordUuid: string }) {
		console.log('fromProducedToConsumed', { recordUuid });
		const productionsKeyList = Object.keys(this.productions);
		const productionsKeyListLength = productionsKeyList.length;
		const thereAreLessProductionItemThanTheConsumptionListMaxLength = productionsKeyListLength < consumptionListMaxLength;
		const lengthConsumed = thereAreLessProductionItemThanTheConsumptionListMaxLength ? productionsKeyListLength : consumptionListMaxLength;
		this.consumedProductions[recordUuid] = productionsKeyList
			.filter((_, index) => index < lengthConsumed)
			.reduce((productionList, productionUuid) => {
				const production = this.productions[productionUuid];
				delete this.productions[productionUuid];
				return [...productionList, { ...production, productionUuid }];
			}, []);
		this.logProductionStates();
		setTimeout(() => {
			const isStillNotReceived = Object.keys(this.consumedProductions).includes(recordUuid);
			if (isStillNotReceived) {
				this.fromConsumedToProduced({ recordUuid });
			}
		}, this.core.maxTimeAllowedForGoingFromConsumedToReceived);
	}

	fromConsumedToProduced({ recordUuid }: { recordUuid: string }) {
		console.log('fromConsumedToProduced', { recordUuid });
		this.consumedProductions[recordUuid].forEach((production) => {
			this.productions[production.productionUuid] = production;
		});
		delete this.consumedProductions[recordUuid];
		this.logProductionStates();
	}

	fromConsumedToReceived({ recordUuid }: { recordUuid: string }) {
		console.log('fromConsumedToReceived', { recordUuid });
		this.receivedProductions[recordUuid] = this.consumedProductions[recordUuid];
		delete this.consumedProductions[recordUuid];
		this.logProductionStates();
		setTimeout(() => {
			const isStillNotSaved = Object.keys(this.receivedProductions).includes(recordUuid);
			if (isStillNotSaved) {
				this.fromReceivedToProduced({ recordUuid });
			}
		}, this.core.maxTimeAllowedForGoingFromReceivedToSaved);
	}

	fromReceivedToProduced({ recordUuid }: { recordUuid: string }) {
		console.log('fromReceivedToProduced', { recordUuid });
		this.receivedProductions[recordUuid].forEach((production) => {
			this.productions[production.productionUuid] = production;
		});
		delete this.receivedProductions[recordUuid];
		this.logProductionStates();
	}

	fromReceivedToSaved({ recordUuid }: { recordUuid: string }) {
		console.log('fromReceivedToSaved', { recordUuid });
		delete this.receivedProductions[recordUuid];
		this.logProductionStates();
	}

	logProductionStates() {
		const sizeOfProductions = this.sizeOfHumanReadable({ octets: sizeOf(this.productions) });
		const lengthOfProductionsKeyListLength = Object.keys(this.productions).length;
		const lengthOfConsumedProductionsKeyListLength = Object.keys(this.consumedProductions).length;
		const lengthOfReceivededProductionsKeyListLength = Object.keys(this.receivedProductions).length;
		console.log(`produced: ${lengthOfProductionsKeyListLength.toString().padStart(6)}, consumed: ${lengthOfConsumedProductionsKeyListLength.toString().padStart(6)}, received: ${lengthOfReceivededProductionsKeyListLength.toString().padStart(6)}\nsizeOfProductions: ${sizeOfProductions}`);
	}

	canHandleMoreProduction() {
		const sizeOfProductions = sizeOf({ data: this.productions });
		const sizeOfProductionsIsUnderTheMaxAllowed = sizeOfProductions < this.core.sizeOfProductionsMax;
		if (sizeOfProductionsIsUnderTheMaxAllowed) {
			const lengthOfProductionsKeyListLength = Object.keys(this.productions).length;
			const isLengthOfProductionsKeyListUnderTheMaxAllowed = lengthOfProductionsKeyListLength < this.core.productionsKeyListMaxLength;
			if (isLengthOfProductionsKeyListUnderTheMaxAllowed) {
				return true;
			} else {
				console.log(`Size of productions is under the max allowed (${this.sizeOfHumanReadable({ octets: sizeOfProductions })} < ${this.sizeOfHumanReadable({ octets: this.core.sizeOfProductionsMax })}) but length of productions key list is not under the max allowed (${lengthOfProductionsKeyListLength} >= ${this.core.productionsKeyListMaxLength})`);
				return false;
			}
		} else {
			console.log(`Size of productions is not under the max allowed (${this.sizeOfHumanReadable({ octets: sizeOfProductions })} >= ${this.sizeOfHumanReadable({ octets: this.core.sizeOfProductionsMax })})`);
			return false;
		}
	}

	sizeOfHumanReadable({ octets }: { octets: number }) {
		if (octets < NUMBER_OF_OCTETS_IN_ONE_KIBI_OCTET) {
			const bits = this.padAndFixe(octets * NUMBER_OF_BITS_IN_ONE_OCTET);
			return `${bits} b [bits], ${octets} o [octets] (${octets} B [bytes])`;
		} else {
			if (octets < NUMBER_OF_OCTETS_IN_ONE_MEBI_OCTET) {
				const kibiOctets = this.padAndFixe(octets / NUMBER_OF_OCTETS_IN_ONE_KIBI_OCTET);
				const kiloBits = this.padAndFixe((octets / NUMBER_OF_BITS_IN_ONE_KILO_BIT) * NUMBER_OF_BITS_IN_ONE_OCTET);
				const kiloOctets = this.padAndFixe(octets / NUMBER_OF_OCTETS_IN_ONE_KILO_OCTET);
				return `${kiloBits} kb [kilobits], ${kibiOctets} Kio [kibioctets] (${kibiOctets} kiB [kibibytes]), ${kiloOctets} ko [kilooctets] (${kiloOctets} kB [kilobytes])`;
			} else {
				if (octets < NUMBER_OF_OCTETS_IN_ONE_GIBI_OCTET) {
					const mebiOctets = this.padAndFixe(octets / NUMBER_OF_OCTETS_IN_ONE_MEBI_OCTET);
					const megaBits = this.padAndFixe((octets / NUMBER_OF_BITS_IN_ONE_MEGA_BIT) * NUMBER_OF_BITS_IN_ONE_OCTET);
					const megaOctets = this.padAndFixe(octets / NUMBER_OF_OCTETS_IN_ONE_MEGA_OCTET);
					return `${megaBits} Mb [megabits], ${mebiOctets} Mio [mebioctets] (${mebiOctets} MiB [mebibytes]), ${megaOctets} Mo [megaoctets] (${megaOctets} kB [megabytes])`;
				} else {
					if (octets < NUMBER_OF_OCTETS_IN_ONE_GIBI_OCTET) {
						const gibiOctets = this.padAndFixe(octets / NUMBER_OF_OCTETS_IN_ONE_GIBI_OCTET);
						const gigaBits = this.padAndFixe((octets / NUMBER_OF_BITS_IN_ONE_GIGA_BIT) * NUMBER_OF_BITS_IN_ONE_OCTET);
						const gigaOctets = this.padAndFixe(octets / NUMBER_OF_OCTETS_IN_ONE_GIGA_OCTET);
						return `${gigaBits} Gb [gigabits], ${gibiOctets} Gio [gibioctets] (${gibiOctets} GiB [gibibytes]), ${gigaOctets} Go [gigaoctets] (${gigaOctets} GB [gigabytes])`;
					} else {
						const tebiOctets = this.padAndFixe(octets / NUMBER_OF_OCTETS_IN_ONE_TEBI_OCTET);
						const teraBits = this.padAndFixe((octets / NUMBER_OF_BITS_IN_ONE_TERA_BIT) * NUMBER_OF_BITS_IN_ONE_OCTET);
						const teraOctets = this.padAndFixe(octets / NUMBER_OF_OCTETS_IN_ONE_TERA_OCTET);
						return `${teraBits} Tb [terabits], ${tebiOctets} Tio [tebioctets] (${tebiOctets} TiB [tebibytes]), ${teraOctets} To [teraoctets] (${teraOctets} TB [terabytes])`;
					}
				}
			}
		}
	}

	padAndFixe(size: number) {
		return size.toFixed(2).padStart(8, ' ');
	}
}
