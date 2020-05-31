import { ApiService } from './api.service';
import { SubscribeDto } from './dto/subscribe.dto';
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
import {
	Server,
	Socket
	} from 'socket.io';

@ApiTags('pouchdb-manager')
@WebSocketGateway({ namespace: 'pouchdb-manager' })
export class ApiGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
	@WebSocketServer() server: Server;

	constructor(private readonly apiService: ApiService) {}

	afterInit(server) {
		// console.log('afterInit', { server });
	}

	handleConnection(client, ...args: any[]) {
		// console.log('handleConnection', { client, args });
	}

	handleDisconnect(client) {
		// console.log('handleDisconnect', { client });
	}
	@SubscribeMessage('subscribe')
	@ApiOperation({ summary: 'Subscribe' })
	@ApiResponse({ status: 403, description: 'Forbidden.' })
	subscribe(@MessageBody() subscribeDto: SubscribeDto, @ConnectedSocket() socket: Socket) {
		return this.apiService.subscribe({ ...subscribeDto, socket });
	}
}
