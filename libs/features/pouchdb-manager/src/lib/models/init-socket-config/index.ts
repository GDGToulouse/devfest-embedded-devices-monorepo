import { SocketListeners } from '../socket-listeners';

export interface InitSocketConfig {
	listeners: SocketListeners;
	uri: string;
	opts?: SocketIOClient.ConnectOpts;
}
