import { ExecutionConfig } from './execution-config';
import { Doc } from '../doc';

export * from './execution-config';

export type SensorConfig = Doc & {
	productionConfig: ExecutionConfig;
	command: string;
};
