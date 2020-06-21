import { Os } from '@gdgtoulouse/structures/metric-manager';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class OsDto implements Os {
	@ApiProperty({ required: true, default: undefined, example: 'android', description: 'The name of the OS under which the browser was launched.' })
	@IsString()
	readonly name: string;

	@ApiProperty({ required: true, default: undefined, example: 'android', description: 'The version of the OS under which the browser was launched.' })
	@IsString()
	readonly version: string;
}
