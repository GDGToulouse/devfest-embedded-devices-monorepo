import { NotificationConfig } from '../notification-config';
import { Action } from '@ngrx/store';
import Pouchdb from 'pouchdb';

// useless except to prevent the import removal from vscode organize imports extension
type PouchdbType = typeof Pouchdb;

export type ActionFromNotificationConfigGenerator = ({ notificationConfig }: { notificationConfig: NotificationConfig }) => Action[];

export interface SubscriptionConfig {
	changesOptions: PouchDB.Core.ChangesOptions | string;
	databaseConfiguration: PouchDB.Configuration.DatabaseConfiguration | string;
	notifications?: {
		changeList?: ActionFromNotificationConfigGenerator[];
		completeList?: ActionFromNotificationConfigGenerator[];
		errorList?: ActionFromNotificationConfigGenerator[];
		sync?: {
			changeList?: ActionFromNotificationConfigGenerator[];
			completeList?: ActionFromNotificationConfigGenerator[];
			errorList?: ActionFromNotificationConfigGenerator[];
		};
	};
	destinationList: string[];
}
