import { DeviceInfoDto } from './device-info';
import { NgxDeviceDetector } from '@gdgtoulouse/structures/metric-manager';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean } from 'class-validator';

export * from './device-info';

export class NgxDeviceDetectorDto implements NgxDeviceDetector {
	@ApiProperty({ required: true, default: {}, example: { browser: 'chrome', os: { name: 'android', version: '24.4.3' }, device: 'Pixel4 (XL)', userAgent: 'xxxx' }, description: 'Some information about the device.' })
	@Type(() => DeviceInfoDto)
	readonly deviceInfo: DeviceInfoDto;

	@ApiProperty({ required: true, example: true, description: 'Wheither the device is considered as mobile or not.' })
	@IsBoolean()
	readonly isMobile: boolean;

	@ApiProperty({ required: true, example: false, description: 'Wheither the device is considered as tablet or not.' })
	@IsBoolean()
	readonly isTablet: boolean;

	@ApiProperty({ required: true, example: false, description: 'Wheither the device is considered as desktop or not.' })
	@IsBoolean()
	readonly isDesktop: boolean;
}
