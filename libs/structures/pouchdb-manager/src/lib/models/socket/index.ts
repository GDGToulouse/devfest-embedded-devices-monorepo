import { Databases } from './databases';
import { Socket as SocketIoSocket } from 'socket.io';

export * from './databases';

export type Socket = SocketIoSocket & { databases: Databases };
