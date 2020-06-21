import 'socket.io-client';

export type ClientSocket = SocketIOClient.Socket & { socketUuid: string | undefined };
