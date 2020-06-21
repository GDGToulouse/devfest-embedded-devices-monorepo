import {
	Core,
	RecordDto,
	RegisterDto
	} from '../models';
import { UpdateConfigDto } from '../models/update-config';
import { CREATED } from '@gdgtoulouse/structures/http-status-code';
import {
	RecordOut,
	RegisterOut,
	ServerSocket,
	UpdateConfigOut
	} from '@gdgtoulouse/structures/metric-manager';
import {
	HttpService,
	Injectable
	} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Pouchdb from 'pouchdb';
import { v4 as Uuid } from 'uuid';

Pouchdb.setMaxListeners(500);

@Injectable()
export class SocketService {
	private uuid = Uuid();
	private date = Date.now();
	private core: Core;

	constructor(private httpService: HttpService, private configService: ConfigService) {
		this.core = this.configService.get<Core>('libs.apis.metric-manager');
	}

	register({ in: { sessionConfigList }, socket }: { in: RegisterDto; socket: ServerSocket }) {
		const out: RegisterOut = [];
		return out;
	}

	record({ in: record, socket }: { in: RecordDto; socket: ServerSocket }) {
		const out: RecordOut = { recordUuid: record.recordUuid };
		console.log('record', { out });
		const url = `${this.core.database.name}/deployment-${record.deploymentUuid}/_bulk_docs`;
		this.httpService
			.request({
				url,
				method: 'POST',
				data: {
					docs: record.consumptionList.map((consumption) => ({
						deploymentUuid: this.core.deploymentUuid,
						serviceUuid: this.uuid,
						serviceDate: this.date,
						_id: Uuid(),
						date: Date.now(),
						record: {
							deploymentUuid: record.deploymentUuid,
							recordUuid: record.recordUuid,
							serviceUuid: record.serviceUuid,
							consumption
						}
					}))
				}
			})
			.toPromise()
			.then((response) => {
				console.log(response.status);
				if (response.status === CREATED) {
					const recordThen = {
						recordUuid: record.recordUuid
					};
					socket.emit('record-then', recordThen);
				} else {
					throw Error(`Record failure, status code was ${response.status} instead of ${CREATED} (CREATED)`);
				}
			})
			.catch((error) => {
				const recordCatch = {
					recordUuid: record.recordUuid
				};
				socket.emit('record-catch', recordCatch);
				console.log('jajaj', { error });
			});
		return out;
	}

	updateConfig({ in: { deploymentUuid }, socket }: { in: UpdateConfigDto; socket: ServerSocket }) {
		const out: UpdateConfigOut = true;
		return out;
	}
}
