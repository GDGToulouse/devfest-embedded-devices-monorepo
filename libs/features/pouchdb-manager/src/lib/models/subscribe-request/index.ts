import { Destination } from '../destination';
import { DatabaseConfigurationAndChangesOptions } from '@gdgtoulouse/structures/pouchdb-manager';

export type SubscribeRequest = Destination & DatabaseConfigurationAndChangesOptions;
