import { RegisterDatabaseConfigurationAuth } from '@gdgtoulouse/structures/pouchdb-manager';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RegisterDatabaseConfigurationAuthDto implements RegisterDatabaseConfigurationAuth {
	@ApiProperty({ required: true, example: 'cloud', description: 'The password.' })
	@IsString()
	readonly password: string;

	@ApiProperty({ required: true, example: 'cloud', description: 'The username.' })
	@IsString()
	readonly username: string;
}
