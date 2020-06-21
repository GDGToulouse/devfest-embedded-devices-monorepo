import { ProcessStdoutCloseDto } from './close';
import { ProcessStdoutDataDto } from './data';
import { ProcessStdoutEndDto } from './end';
import { ProcessStdoutErrorDto } from './error';
import { ProcessStdoutPauseDto } from './pause';
import { ProcessStdoutResumeDto } from './resume';
import {
	ProcessStdout,
	ProcessStdoutClose
	} from '@gdgtoulouse/structures/metric-manager';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray } from 'class-validator';

export * from './close';
export * from './data';
export * from './end';
export * from './error';
export * from './pause';
export * from './resume';

export class ProcessStdoutDto implements ProcessStdout {
	@ApiProperty({
		required: true,
		example: [
			{ uuid: '7b62f49f-e13f-4de1-8f3b-68dff4f8ad05', data: false },
			{ uuid: '0b62f49f-e13f-4de1-8f3b-68dff4f8ad05', data: true }
		],
		description: 'The emitted by the stdout of the process, close event data'
	})
	@IsArray()
	@Type(() => ProcessStdoutCloseDto)
	readonly close: ProcessStdoutClose[];

	@ApiProperty({
		required: true,
		example: [
			{ uuid: '7b62f49f-e13f-4de1-8f3b-68dff4f8ad05', data: 'ok' },
			{ uuid: '0b62f49f-e13f-4de1-8f3b-68dff4f8ad05', data: 'yes' }
		],
		description: 'The emitted by the stdout of the process, data event data'
	})
	@IsArray()
	@Type(() => ProcessStdoutDataDto)
	readonly data: ProcessStdoutDataDto[];

	@ApiProperty({
		required: true,
		example: [
			{ uuid: '7b62f49f-e13f-4de1-8f3b-68dff4f8ad05', data: 'enable' },
			{ uuid: '0b62f49f-e13f-4de1-8f3b-68dff4f8ad05', data: 'disable' }
		],
		description: 'The emitted by the stdout of the process, end event data'
	})
	@IsArray()
	@Type(() => ProcessStdoutEndDto)
	readonly end: ProcessStdoutEndDto[];

	@ApiProperty({
		required: true,
		example: [
			{ uuid: '7b62f49f-e13f-4de1-8f3b-68dff4f8ad05', data: Error('Use case error 1') },
			{ uuid: '0b62f49f-e13f-4de1-8f3b-68dff4f8ad05', data: Error('Use case error 2') }
		],
		description: 'The emitted by the stdout of the process, error event data'
	})
	@IsArray()
	@Type(() => ProcessStdoutErrorDto)
	readonly error: ProcessStdoutErrorDto[];

	@ApiProperty({
		required: true,
		example: [
			{ uuid: '7b62f49f-e13f-4de1-8f3b-68dff4f8ad05', data: 'enable' },
			{ uuid: '0b62f49f-e13f-4de1-8f3b-68dff4f8ad05', data: 'disable' }
		],
		description: 'The emitted by the stdout of the process, pause event data'
	})
	@IsArray()
	@Type(() => ProcessStdoutPauseDto)
	readonly pause: ProcessStdoutPauseDto[];

	@ApiProperty({
		required: true,
		example: [
			{ uuid: '7b62f49f-e13f-4de1-8f3b-68dff4f8ad05', data: 'enable' },
			{ uuid: '0b62f49f-e13f-4de1-8f3b-68dff4f8ad05', data: 'disable' }
		],
		description: 'The emitted by the stdout of the process, resume event data'
	})
	@IsArray()
	@Type(() => ProcessStdoutResumeDto)
	readonly resume: ProcessStdoutResumeDto[];
}
