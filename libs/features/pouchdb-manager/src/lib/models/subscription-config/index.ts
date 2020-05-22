import { NotificationConfig } from '../notification-config';
import { Action } from '@ngrx/store';
import Pouchdb from 'pouchdb';

// useless except to prevent the import removal from vscode organize imports extension
type PouchdbType = typeof Pouchdb;

export interface SubscriptionConfig {
	changesOptions: PouchDB.Core.ChangesOptions | string;
	databaseConfiguration: PouchDB.Configuration.DatabaseConfiguration | string;
	notifications?: {
		change?: ({ notificationConfig }: { notificationConfig: NotificationConfig }) => Action;
		complete?: ({ notificationConfig }: { notificationConfig: NotificationConfig }) => Action;
		error?: ({ notificationConfig }: { notificationConfig: NotificationConfig }) => Action;
		sync?: {
			change?: ({ notificationConfig }: { notificationConfig: NotificationConfig }) => Action;
			complete?: ({ notificationConfig }: { notificationConfig: NotificationConfig }) => Action;
			error?: ({ notificationConfig }: { notificationConfig: NotificationConfig }) => Action;
		};
	};
	destinationList: string[];
}
