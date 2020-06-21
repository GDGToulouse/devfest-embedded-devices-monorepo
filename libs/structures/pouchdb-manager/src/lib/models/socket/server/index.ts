import { Databases } from './databases';
import { Socket } from 'socket.io';

export * from './databases';

export type ServerSocket = Socket & { databases: Databases };
