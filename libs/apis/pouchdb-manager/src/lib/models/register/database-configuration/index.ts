import { RegisterDatabaseConfigurationAuthDto } from './auth';
import { RegisterDatabaseConfiguration } from '@gdgtoulouse/structures/pouchdb-manager';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString } from 'class-validator';

export * from './auth';

export class RegisterDatabaseConfigurationDto implements RegisterDatabaseConfiguration {
	@ApiProperty({ required: true, example: 'http://localhost:5000/menu-default', description: 'The name (or URL) of the database.' })
	@IsString()
	readonly name: string;

	@ApiProperty({ required: true, example: { password: 'cloud', username: 'cloud' }, description: 'The authentication settings.' })
	@Type(() => RegisterDatabaseConfigurationAuthDto)
	readonly auth: RegisterDatabaseConfigurationAuthDto;
}
