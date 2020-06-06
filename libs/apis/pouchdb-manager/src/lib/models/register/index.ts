import { RegisterChangesOptionsDto } from './changes-options';
import { RegisterDatabaseConfigurationDto } from './database-configuration';
import { Register } from '@gdgtoulouse/structures/pouchdb-manager';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export * from './changes-options';
export * from './database-configuration';

export class RegisterDto implements Register {
	@ApiProperty({ required: false, example: { include_docs: true, selector: { $and: [{ $or: [{ pid: { $eq: 'projects-com-gpio-configs' } }, { pid: { $eq: 'projects-com-gpio-executions' } }] }] } }, description: 'The changes options to use.' })
	@Type(() => RegisterChangesOptionsDto)
	readonly changesOptions?: RegisterChangesOptionsDto;

	@ApiProperty({ required: true, example: { name: 'http://localhost:5000/sidenavs-start-default', auth: { password: 'cloud', username: 'cloud' } }, description: 'The command to run.' })
	@Type(() => RegisterDatabaseConfigurationDto)
	readonly databaseConfiguration: RegisterDatabaseConfigurationDto;
}
