import { Socket } from 'socket.io';

export type ServerSocket = Socket & { socketUuid: string | undefined; socketDate: number | undefined };
