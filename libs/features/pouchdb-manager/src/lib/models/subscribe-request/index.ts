import { Destination } from '../destination';
import { InitSocketConfig } from '../init-socket-config';
import { DatabaseConfigurationAndChangesOptions } from '@gdgtoulouse/structures/pouchdb-manager';

export type SubscribeRequest = Destination & DatabaseConfigurationAndChangesOptions & { initSocketConfig?: InitSocketConfig };
