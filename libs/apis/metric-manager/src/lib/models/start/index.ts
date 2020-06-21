import { Start } from '@gdgtoulouse/structures/metric-manager';
import { ApiProperty } from '@nestjs/swagger';
import {
	IsObject,
	IsString
	} from 'class-validator';

export class StartDto implements Start {
	@ApiProperty({ required: true, example: '20200613204826000000000', description: 'The time when the measured was done in format YYYYMMDDHHmmssmmmuuunnn' })
	@IsString()
	readonly time: string;

	@ApiProperty({ required: true, example: '595fc8c5-5de2-463b-8c09-72c481570051', description: 'The UUID (v4) of the host which collected the measure' })
	@IsString()
	readonly hostKey: string;

	@ApiProperty({ required: false, example: '595fc8c5-5de2-463b-8c09-72c481570051', description: 'The UUID (v4) of the user under which the measure was collected' })
	@IsString()
	readonly userKey: string;

	@ApiProperty({ required: true, example: '595fc8c5-5de2-463b-8c09-72c481570051', description: 'The UUID (v4) of the sensor which collected the measure for the host' })
	@IsString()
	readonly sensorKey: string;

	@ApiProperty({ required: true, example: { value: 37 }, description: 'The measure payload' })
	@IsObject()
	readonly payload: object;
}
