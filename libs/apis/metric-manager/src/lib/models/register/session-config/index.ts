import { NgxDeviceDetectorDto } from './ngx-device-detector';
import { UserConfigDto } from './user-config';
import { SessionConfig } from '@gdgtoulouse/structures/metric-manager';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export * from './ngx-device-detector';
export * from './user-config';

export class SessionConfigDto implements SessionConfig {
	@ApiProperty({ required: false, example: { ngxDeviceDetector: { deviceInfo: { browser: 'chrome', os: { name: 'android', version: '24.4.3' }, device: 'Pixel4 (XL)', userAgent: 'xxxx', osVersion: '24.4.3' }, isMobile: true, isTablet: false, isDesktop: false } }, description: 'The device to register.' })
	@Type(() => UserConfigDto)
	readonly userConfig?: UserConfigDto;

	//TODO update example
	@ApiProperty({ required: false, example: { deviceInfo: { browser: 'chrome', os: { name: 'android', version: '24.4.3' }, device: 'Pixel4 (XL)', userAgent: 'xxxx', osVersion: '24.4.3' }, isMobile: true, isTablet: false, isDesktop: false }, description: 'The device to register.' })
	@Type(() => NgxDeviceDetectorDto)
	readonly ngxDeviceDetector?: NgxDeviceDetectorDto;
}
