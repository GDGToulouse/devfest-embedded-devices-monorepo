import { indexName } from './index.config';
import {
	RecordDto,
	RegisterDto
	} from './models';
import { UpdateConfigDto } from './models/update-config';
import { GatewayService } from './services/gateway.service';
import { SocketService } from './services/socket.service';
import { ServerSocket } from '@gdgtoulouse/structures/metric-manager';
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
		console.log({ indexName }, 'afterInit');
		return this.gatewayService.afterInit({ server });
	}

	handleConnection(socket: ServerSocket, ...args: any[]) {
		console.log({ indexName }, 'handleConnection');
		return this.gatewayService.handleConnection({ socket, args });
	}

	handleDisconnect(socket: ServerSocket) {
		console.log({ indexName }, 'handleDisconnect');
		return this.gatewayService.handleDisconnect({ socket });
	}

	@SubscribeMessage('update-config')
	@ApiOperation({ summary: 'updateConfig' })
	@ApiResponse({ status: 403, description: 'Forbidden.' })
	updateConfig(@MessageBody() [updateConfigIn]: UpdateConfigDto[], @ConnectedSocket() socket: ServerSocket) {
		console.log({ indexName }, 'updateConfig');
		return this.socketService.updateConfig({ in: updateConfigIn, socket });
	}

	@SubscribeMessage('register')
	@ApiOperation({ summary: 'Register' })
	@ApiResponse({ status: 403, description: 'Forbidden.' })
	register(@MessageBody() [registerIn]: RegisterDto[], @ConnectedSocket() socket: ServerSocket) {
		return this.socketService.register({ in: registerIn, socket });
	}

	@SubscribeMessage('record')
	@ApiOperation({ summary: 'Record' })
	@ApiResponse({ status: 403, description: 'Forbidden.' })
	record(@MessageBody() [recordIn]: RecordDto[], @ConnectedSocket() socket: ServerSocket) {
		return this.socketService.record({ in: recordIn, socket });
	}
}
