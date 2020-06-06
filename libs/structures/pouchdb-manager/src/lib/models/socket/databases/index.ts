import { DatabasesItem } from './item';

export * from './item';

export interface Databases {
	[databaseConfigurationKey: string]: DatabasesItem;
}
