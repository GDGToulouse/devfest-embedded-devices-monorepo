import { Database } from './database';

export * from './database';

export interface Core {
	deploymentUuid: string;
	database: Database;
}
