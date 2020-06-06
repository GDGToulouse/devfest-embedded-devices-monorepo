export interface SocketListeners {
	connect?: boolean;
	handleConnection?: boolean;
	disconnect?: boolean;
	exception?: boolean;
	since0Change?: boolean;
	since0CompleteInfo?: boolean;
	liveSinceLastSeqChange?: boolean;
	liveSinceLastSeqCompleteInfo?: boolean;
	liveSinceLastSeqError?: boolean;
	since0Error?: boolean;
}
