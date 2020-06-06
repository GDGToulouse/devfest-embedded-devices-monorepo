import { RegisterDatabaseConfigurationAuth } from './auth';

export * from './auth';

export interface RegisterDatabaseConfiguration {
	readonly name: string;
	readonly auth: RegisterDatabaseConfigurationAuth;
}
