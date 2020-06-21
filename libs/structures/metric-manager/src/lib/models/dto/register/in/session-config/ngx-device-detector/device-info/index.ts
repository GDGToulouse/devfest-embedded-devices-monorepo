import { Os } from './os';

export * from './os';

export interface DeviceInfo {
	readonly browser: string;
	readonly os: Os;
	readonly device: string;
	readonly userAgent: string;
}
