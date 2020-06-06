import { RegisterChangesOptions } from './changes-options';
import { RegisterDatabaseConfiguration } from './database-configuration';

export * from './changes-options';
export * from './database-configuration';

export interface Register {
	readonly changesOptions?: RegisterChangesOptions;
	readonly databaseConfiguration: RegisterDatabaseConfiguration;
}
