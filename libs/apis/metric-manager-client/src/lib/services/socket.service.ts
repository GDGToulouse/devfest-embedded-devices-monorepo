import { indexName } from '../index.config';
import {
	SocketEmitsHandleConnection,
	SocketEmitsUpdateConfig
	} from '@gdgtoulouse/structures/metric-manager';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SocketService {
	constructor() {
		console.log({ indexName }, 'constructor');
	}

	connect() {
		console.log({ indexName }, 'connect');
	}

	reconnect() {
		console.log({ indexName }, 'reconnect');
	}

	handleConnection({ socketEmitsHandleConnection }: { socketEmitsHandleConnection: SocketEmitsHandleConnection }) {
		console.log({ indexName }, 'handleConnection', { socketEmitsHandleConnection });
	}

	exception({ error }: { error: any }) {
		console.log({ indexName }, 'exception', { error });
	}

	disconnect() {
		console.log({ indexName }, 'disconnect');
	}

	updateConfig({ socketEmitsUpdateConfig }: { socketEmitsUpdateConfig: SocketEmitsUpdateConfig }) {
		console.log({ indexName }, 'updateConfig');
	}
}
