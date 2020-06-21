import { ProcessEventsExit } from '@gdgtoulouse/structures/metric-manager';
import { ApiProperty } from '@nestjs/swagger';
import {
	IsNumber,
	IsString
	} from 'class-validator';

export class ProcessEventsExitDto implements ProcessEventsExit {
	@ApiProperty({ required: true, example: '7b62f49f-e13f-4de1-8f3b-68dff4f8ad05', description: 'The uuid of the produced data.' })
	@IsString()
	readonly uuid: string;

	@ApiProperty({ required: true, example: 1592760934860, description: 'The date when the event occured.' })
	@IsNumber()
	readonly date: number;

	@ApiProperty({ required: true, example: [], description: 'The emitted data sent by the events of the process when the exit event occurs.' })
	@IsString()
	readonly data: number;
}
