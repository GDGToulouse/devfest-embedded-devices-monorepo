import {
	ServerSocket,
	SocketEmitsHandleConnection
	} from '@gdgtoulouse/structures/metric-manager';
import { Injectable } from '@nestjs/common';
import { Server } from 'socket.io';
import { v4 as Uuid } from 'uuid';

@Injectable()
export class GatewayService {
	afterInit({ server }: { server: Server }) {
		// console.log('afterInit');
		server.setMaxListeners(500); //TODO -> envs or better other place?
	}

	handleConnection({ socket, args }: { socket: ServerSocket; args: any[] }) {
		// console.log('handleConnection', { args });
		const socketDoesNotSubscribedYet = !Object.keys(socket).includes('socketUuid');
		if (socketDoesNotSubscribedYet) {
			socket.socketUuid = Uuid();
			socket.socketDate = Date.now();
		}
		const socketEmitsHandleConnection: SocketEmitsHandleConnection = { args, socketUuid: socket.socketUuid };
		socket.emit('handleConnection', socketEmitsHandleConnection);
	}

	handleDisconnect({ socket }: { socket: ServerSocket }) {}
}
