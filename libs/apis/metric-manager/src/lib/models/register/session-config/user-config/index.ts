import { UserConfig } from '@gdgtoulouse/structures/metric-manager';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UserConfigDto implements UserConfig {
	//TODO update example
	@ApiProperty({ required: true, example: 'sarah.pam@yopmail.com', description: 'The email of the user providing the measure.' })
	@IsString()
	readonly email: string;
}
