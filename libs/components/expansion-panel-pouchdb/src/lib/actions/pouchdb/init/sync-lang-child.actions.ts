import { indexName } from '../../../index.config';
import { Destination } from '@gdgtoulouse/features/pouchdb-manager';
import {
	Register,
	Since0EmitsChange
	} from '@gdgtoulouse/structures/pouchdb-manager';
import {
	createAction,
	props
	} from '@ngrx/store';

export const topic = 'pouchdb-init-sync-lang-child';

export const exec = createAction(
	`[${indexName}][${topic}] exec`,
	props<
		{
			since0EmitsChange: Since0EmitsChange;
			langSubscribeRequest?: Register;
			subscribeRequest?: Register;
		} & Destination
	>()
);
