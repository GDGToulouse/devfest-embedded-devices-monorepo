import { SubscribeDto } from './dto/subscribe.dto';
import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';

@Injectable()
export class ApiService {
	subscribe({ changesOptions, databaseConfiguration, destinationList, socket }: SubscribeDto & { socket: Socket }) {
		// console.log({ changesOptions, databaseConfiguration, destinationList, socket });
		return [1, 2, 3].map((item) => !!socket.emit('subscribe-success', { item }));
	}
}
