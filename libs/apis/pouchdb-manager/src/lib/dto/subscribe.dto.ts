import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
	IsArray,
	IsBoolean,
	IsObject,
	IsString
	} from 'class-validator';

export class DatabaseConfigurationAuthDto {
	@ApiProperty({ required: true, example: 'cloud', description: 'The password.' })
	@IsString()
	readonly password: string;

	@ApiProperty({ required: true, example: 'cloud', description: 'The username.' })
	@IsString()
	readonly username: string;
}

export class DatabaseConfigurationDto {
	@ApiProperty({ required: true, example: 'http://localhost:5000/menu-default', description: 'The name (or URL) of the database.' })
	@IsString()
	readonly name: string;

	@ApiProperty({ required: true, example: { password: 'cloud', username: 'cloud' }, description: 'The authentication settings.' })
	@Type(() => DatabaseConfigurationAuthDto)
	readonly auth: DatabaseConfigurationAuthDto;
}

export class ChangesOptionsDto {
	@ApiProperty({ required: true, example: true, description: 'Wheither to include or not the documents affected by the changes.' })
	@IsBoolean()
	readonly include_docs: boolean;

	@ApiProperty({ required: true, example: 'continuous', description: 'The behaviour to use for the feed.' })
	@IsString()
	readonly feed: string;

	@ApiProperty({ required: true, example: true, description: 'Wheither to use an heartbeat or not.' })
	@IsBoolean()
	readonly heartbeat: boolean;

	@ApiProperty({ required: false, example: { selector: { $and: [{ $or: [{ pid: { $eq: 'projects-com-gpio-configs' } }, { pid: { $eq: 'projects-com-gpio-executions' } }] }] } }, description: 'The filter to apply on changes.' })
	@IsObject()
	readonly filter: any;
}

export class SubscribeDto {
	@ApiProperty({ required: true, example: { include_docs: true, feed: 'continuous', heartbeat: true, filter: { selector: { $and: [{ $or: [{ pid: { $eq: 'projects-com-gpio-configs' } }, { pid: { $eq: 'projects-com-gpio-executions' } }] }] } } }, description: 'The changes options to use.' })
	@Type(() => ChangesOptionsDto)
	readonly changesOptions: ChangesOptionsDto;

	@ApiProperty({ required: true, example: { name: 'http://localhost:5000/menu-default', auth: { password: 'cloud', username: 'cloud' } }, description: 'The command to run.' })
	@Type(() => ChangesOptionsDto)
	readonly databaseConfiguration: DatabaseConfigurationDto;

	@ApiProperty({ required: true, example: [`route/sidenavs/start/menu`], description: 'The destinations indexing the feed.' })
	@IsArray()
	@IsString()
	readonly destinationList: string[];
}
