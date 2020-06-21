import { UpdateConfig } from '@gdgtoulouse/structures/metric-manager';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateConfigDto implements UpdateConfig {
	@ApiProperty({ required: true, example: '7b62f49f-e13f-4de1-8f3b-68dff4f8ad05', description: 'The UUID of the deployment which requires a config update' })
	@IsString()
	readonly deploymentUuid: string;
}
