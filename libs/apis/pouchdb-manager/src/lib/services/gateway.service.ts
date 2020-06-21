import {
	ServerSocket,
	SocketEmitsHandleConnection
	} from '@gdgtoulouse/structures/pouchdb-manager';
import { Injectable } from '@nestjs/common';
import { Server } from 'socket.io';

@Injectable()
export class GatewayService {
	afterInit({ server }: { server: Server }) {
		// console.log('afterInit');
		server.setMaxListeners(500); //TODO -> envs or better other place?
	}

	handleConnection({ socket, args }: { socket: ServerSocket; args: any[] }) {
		// console.log('handleConnection', { args });
		const socketDoesNotSubscribedYet = !Object.keys(socket).includes('databases');
		if (socketDoesNotSubscribedYet) {
			socket.databases = {};
		}
		const socketEmitsHandleConnection: SocketEmitsHandleConnection = args;
		socket.emit('handleConnection', socketEmitsHandleConnection);
	}

	handleDisconnect({ socket }: { socket: ServerSocket }) {
		const databasesAreDefined = Object.keys(socket).includes('databases');
		if (databasesAreDefined) {
			Object.keys(socket.databases).forEach((databaseKey) => {
				// console.log('handleDisconnect', 'close', { databaseKey, databaseConfiguration: socket.databases[databaseKey].databaseConfiguration });
				socket.databases[databaseKey].database.close();
			});
		}
	}
}
