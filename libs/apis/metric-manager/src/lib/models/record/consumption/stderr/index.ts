import { ProcessStderrCloseDto } from './close';
import { ProcessStderrDataDto } from './data';
import { ProcessStderrEndDto } from './end';
import { ProcessStderrErrorDto } from './error';
import { ProcessStderrPauseDto } from './pause';
import { ProcessStderrResumeDto } from './resume';
import {
	ProcessStderr,
	ProcessStderrClose
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

export class ProcessStderrDto implements ProcessStderr {
	@ApiProperty({
		required: true,
		example: [
			{ uuid: '7b62f49f-e13f-4de1-8f3b-68dff4f8ad05', data: false },
			{ uuid: '0b62f49f-e13f-4de1-8f3b-68dff4f8ad05', data: true }
		],
		description: 'The emitted by the stderr of the process, close event data'
	})
	@IsArray()
	@Type(() => ProcessStderrCloseDto)
	readonly close: ProcessStderrClose[];

	@ApiProperty({
		required: true,
		example: [
			{ uuid: '7b62f49f-e13f-4de1-8f3b-68dff4f8ad05', data: 'ok' },
			{ uuid: '0b62f49f-e13f-4de1-8f3b-68dff4f8ad05', data: 'yes' }
		],
		description: 'The emitted by the stderr of the process, data event data'
	})
	@IsArray()
	@Type(() => ProcessStderrDataDto)
	readonly data: ProcessStderrDataDto[];

	@ApiProperty({
		required: true,
		example: [
			{ uuid: '7b62f49f-e13f-4de1-8f3b-68dff4f8ad05', data: 'enable' },
			{ uuid: '0b62f49f-e13f-4de1-8f3b-68dff4f8ad05', data: 'disable' }
		],
		description: 'The emitted by the stderr of the process, end event data'
	})
	@IsArray()
	@Type(() => ProcessStderrEndDto)
	readonly end: ProcessStderrEndDto[];

	@ApiProperty({
		required: true,
		example: [
			{ uuid: '7b62f49f-e13f-4de1-8f3b-68dff4f8ad05', data: Error('Use case error 1') },
			{ uuid: '0b62f49f-e13f-4de1-8f3b-68dff4f8ad05', data: Error('Use case error 2') }
		],
		description: 'The emitted by the stderr of the process, error event data'
	})
	@IsArray()
	@Type(() => ProcessStderrErrorDto)
	readonly error: ProcessStderrErrorDto[];

	@ApiProperty({
		required: true,
		example: [
			{ uuid: '7b62f49f-e13f-4de1-8f3b-68dff4f8ad05', data: 'enable' },
			{ uuid: '0b62f49f-e13f-4de1-8f3b-68dff4f8ad05', data: 'disable' }
		],
		description: 'The emitted by the stderr of the process, pause event data'
	})
	@IsArray()
	@Type(() => ProcessStderrPauseDto)
	readonly pause: ProcessStderrPauseDto[];

	@ApiProperty({
		required: true,
		example: [
			{ uuid: '7b62f49f-e13f-4de1-8f3b-68dff4f8ad05', data: 'enable' },
			{ uuid: '0b62f49f-e13f-4de1-8f3b-68dff4f8ad05', data: 'disable' }
		],
		description: 'The emitted by the stderr of the process, resume event data'
	})
	@IsArray()
	@Type(() => ProcessStderrResumeDto)
	readonly resume: ProcessStderrResumeDto[];
}
