import { SensorConfig } from '@gdgtoulouse/structures/metric-manager';

export interface MetricManagerCloud {
	socket: {
		uri: string;
		opts?: SocketIOClient.ConnectOpts;
	};
	listeners: {
		connect?: boolean;
		connect_error?: boolean;
		connect_timeout?: boolean;
		connecting?: boolean;
		disconnect?: boolean;
		error?: boolean;
		reconnect?: boolean;
		reconnect_attempt?: boolean;
		reconnect_failed?: boolean;
		reconnect_error?: boolean;
		reconnecting?: boolean;
		ping?: boolean;
		pong?: boolean;
		exception?: boolean;
		handleConnection?: boolean;
		updateConfig?: boolean;
		recordThen?: boolean;
		recordCatch?: boolean;
	};
	productionConfigList: SensorConfig[];
}
