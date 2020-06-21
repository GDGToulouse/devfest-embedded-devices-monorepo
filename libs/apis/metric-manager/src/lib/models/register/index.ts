import { SessionConfigDto } from './session-config';
import { Register } from '@gdgtoulouse/structures/metric-manager';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray } from 'class-validator';

export * from './session-config';

export class RegisterDto implements Register {
	//TODO update example
	@ApiProperty({ required: true, example: [{ userConfig: { email: '' }, ngxDeviceDetector: { deviceInfo: { browser: 'chrome', os: { name: 'android', version: '24.4.3' }, device: 'Pixel4 (XL)', userAgent: 'xxxx', osVersion: '24.4.3' }, isMobile: true, isTablet: false, isDesktop: false } }], description: 'The device to register.' })
	@Type(() => SessionConfigDto)
	@IsArray()
	readonly sessionConfigList: SessionConfigDto[];
}
