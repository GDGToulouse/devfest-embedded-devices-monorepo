import { DeviceInfo } from './device-info';

export * from './device-info';

export interface NgxDeviceDetector {
	readonly deviceInfo: DeviceInfo;
	readonly isMobile: boolean;
	readonly isTablet: boolean;
	readonly isDesktop: boolean;
}
