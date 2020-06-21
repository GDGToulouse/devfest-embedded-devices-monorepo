import { OsDto } from './os';
import { DeviceInfo } from '@gdgtoulouse/structures/metric-manager';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString } from 'class-validator';

export class DeviceInfoDto implements DeviceInfo {
	@ApiProperty({ required: true, default: undefined, example: 'chrome', description: 'The browser used.' })
	@IsString()
	readonly browser: string;

	@ApiProperty({ required: true, default: {}, example: { name: 'android', version: '24.4.3' }, description: 'The OS under which the browser was launched.' })
	@Type(() => OsDto)
	readonly os: OsDto;

	@ApiProperty({ required: true, default: undefined, example: 'Pixel4 (XL)', description: 'The device under which the OS was booted.' })
	@IsString()
	readonly device: string;

	@ApiProperty({ required: true, default: undefined, example: 'xxxx', description: 'The associated user agent.' })
	@IsString()
	readonly userAgent: string;
}
