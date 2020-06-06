import { Start } from '@gdgtoulouse/structures/pouchdb-manager';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class StartDto implements Start {
	@ApiProperty({ required: true, example: '82becf0f-ac6f-44f5-aec4-6cfb47cb6b55', description: 'The changes options key used for indexation.' })
	@IsString()
	readonly changesOptionsKey: string;

	@ApiProperty({ required: true, example: 'fa783382-7d46-47f6-8aec-1b10b92ce739', description: 'The database configuration key used for indexation.' })
	@IsString()
	readonly databaseConfigurationKey: string;
}
