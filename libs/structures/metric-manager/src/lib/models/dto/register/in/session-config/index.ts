import { NgxDeviceDetector } from './ngx-device-detector';
import { UserConfig } from './user-config';

export * from './ngx-device-detector';
export * from './user-config';

export interface SessionConfig {
	readonly userConfig?: UserConfig;
	readonly ngxDeviceDetector?: NgxDeviceDetector;
}
