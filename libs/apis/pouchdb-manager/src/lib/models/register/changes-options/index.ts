import { RegisterChangesOptions } from '@gdgtoulouse/structures/pouchdb-manager';
import { ApiProperty } from '@nestjs/swagger';
import {
	IsBoolean,
	IsObject
	} from 'class-validator';
import Pouchdb from 'pouchdb';

// useless except to prevent the import removal from vscode organize imports extension
type PouchdbType = typeof Pouchdb;

export class RegisterChangesOptionsDto implements RegisterChangesOptions {
	@ApiProperty({ required: true, default: true, example: true, description: 'Wheither to include or not the documents affected by the changes.' })
	@IsBoolean()
	readonly include_docs?: boolean;

	@ApiProperty({ required: false, example: { $and: [{ $or: [{ pid: { $eq: 'projects-com-gpio-configs' } }, { pid: { $eq: 'projects-com-gpio-executions' } }] }] }, description: 'The filter to apply on changes.' })
	@IsObject()
	readonly selector?: PouchDB.Find.Selector;
}
