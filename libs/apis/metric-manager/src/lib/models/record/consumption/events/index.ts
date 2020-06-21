import { ProcessEventsCloseDto } from './close';
import { ProcessEventsDisconnectDto } from './disconnect';
import { ProcessEventsErrorDto } from './error';
import { ProcessEventsExitDto } from './exit';
import { ProcessEventsMessageDto } from './message';
import { ProcessEvents } from '@gdgtoulouse/structures/metric-manager';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray } from 'class-validator';

export * from './close';
export * from './disconnect';
export * from './error';
export * from './exit';
export * from './message';

export class ProcessEventsDto implements ProcessEvents {
	@ApiProperty({ required: true, example: [], description: 'The emitted by the process, close event data' })
	@IsArray()
	@Type(() => ProcessEventsCloseDto)
	readonly close: ProcessEventsCloseDto[];

	@ApiProperty({ required: true, example: [], description: 'The emitted by the process, disconnect event data' })
	@IsArray()
	@Type(() => ProcessEventsDisconnectDto)
	readonly disconnect: ProcessEventsDisconnectDto[];

	@ApiProperty({ required: true, example: [], description: 'The emitted by the process, error event data' })
	@IsArray()
	@Type(() => ProcessEventsErrorDto)
	readonly error: ProcessEventsErrorDto[];

	@ApiProperty({ required: true, example: [], description: 'The emitted by the process, exit event data' })
	@IsArray()
	@Type(() => ProcessEventsExitDto)
	readonly exit: ProcessEventsExitDto[];

	@ApiProperty({ required: true, example: [], description: 'The emitted by the process, message event data' })
	@IsArray()
	@Type(() => ProcessEventsMessageDto)
	readonly message: ProcessEventsMessageDto[];
}
