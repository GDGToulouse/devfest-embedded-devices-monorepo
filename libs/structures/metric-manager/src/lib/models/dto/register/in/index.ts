import { SessionConfig } from './session-config';

export * from './session-config';

export interface Register {
	readonly sessionConfigList?: SessionConfig[];
}
