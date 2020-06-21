import { indexName } from './index.config';
import {
	RegisterDto,
	StartDto
	} from './models';
import { GatewayService } from './services/gateway.service';
import { SocketService } from './services/socket.service';
import { ServerSocket } from '@gdgtoulouse/structures/pouchdb-manager';
import {
	ApiOperation,
	ApiResponse,
	ApiTags
	} from '@nestjs/swagger';
import {
	ConnectedSocket,
	MessageBody,
	OnGatewayConnection,
	OnGatewayDisconnect,
	OnGatewayInit,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer
	} from '@nestjs/websockets';
import { Server } from 'socket.io';

@ApiTags(indexName)
@WebSocketGateway({ namespace: indexName })
export class IndexGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
	@WebSocketServer() server: Server;

	constructor(private readonly gatewayService: GatewayService, private readonly socketService: SocketService) {}

	afterInit(server: Server) {
		// console.log('afterInit');
		return this.gatewayService.afterInit({ server });
	}

	handleConnection(socket: ServerSocket, ...args: any[]) {
		// console.log('handleConnection');
		return this.gatewayService.handleConnection({ socket, args });
	}

	handleDisconnect(socket: ServerSocket) {
		// console.log('handleDisconnect');
		return this.gatewayService.handleDisconnect({ socket });
	}

	@SubscribeMessage('register')
	@ApiOperation({ summary: 'Register' })
	@ApiResponse({ status: 403, description: 'Forbidden.' })
	register(@MessageBody() [registerIn]: RegisterDto[], @ConnectedSocket() socket: ServerSocket) {
		// console.log('register');
		return this.socketService.register({ in: registerIn, socket });
	}

	@SubscribeMessage('start')
	@ApiOperation({ summary: 'Start' })
	@ApiResponse({ status: 403, description: 'Forbidden.' })
	start(@MessageBody() [startIn]: StartDto[], @ConnectedSocket() socket: ServerSocket) {
		return this.socketService.start({ in: startIn, socket });
	}
}
