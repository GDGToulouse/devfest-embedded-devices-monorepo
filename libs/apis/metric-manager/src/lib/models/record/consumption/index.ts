import { ProcessEventsDto } from './events';
import { ProcessStderrDto } from './stderr';
import { ProcessStdoutDto } from './stdout';
import { Consumption } from '@gdgtoulouse/structures/metric-manager';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString } from 'class-validator';

export * from './events';
export * from './stderr';
export * from './stdout';

export class ConsumptionDto implements Consumption {
	@ApiProperty({ required: true, example: '7b62f49f-e13f-4de1-8f3b-68dff4f8ad05', description: 'The uuid of the process' })
	@IsString()
	readonly uuid: string;

	@ApiProperty({
		required: true,
		example: {
			close: [],
			disconnect: [],
			error: [],
			exit: [],
			message: []
		},
		description: 'The information about the events of the process.'
	})
	@Type(() => ProcessEventsDto)
	readonly events: ProcessEventsDto;

	@ApiProperty({
		required: true,
		example: {
			close: [],
			data: [],
			end: [],
			error: [],
			pause: [],
			resume: []
		},
		description: 'The information about the stdout of the process.'
	})
	@Type(() => ProcessStdoutDto)
	readonly stdout: ProcessStdoutDto;

	@ApiProperty({
		required: true,
		example: {
			close: [],
			data: [],
			end: [],
			error: [],
			pause: [],
			resume: []
		},
		description: 'The information about the stderr of the process.'
	})
	@Type(() => ProcessStderrDto)
	readonly stderr: ProcessStderrDto;
}
