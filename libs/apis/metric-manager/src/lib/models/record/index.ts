import { ConsumptionDto } from './consumption';
import { Record } from '@gdgtoulouse/structures/metric-manager';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
	IsArray,
	IsNumber,
	IsString
	} from 'class-validator';

export * from './consumption';

export class RecordDto implements Record {
	@ApiProperty({ required: true, example: '7b62f49f-e13f-4de1-8f3b-68dff4f8ad05', description: 'The uuid of the record' })
	@IsString()
	readonly recordUuid: string;

	@ApiProperty({ required: true, example: 1592745309253, description: 'The date of the record' })
	@IsNumber()
	readonly recordDate: number;

	@ApiProperty({ required: true, example: '7b62f49f-e13f-4de1-8f3b-68dff4f8ad05', description: 'The uuid of the service instance which leads to this record' })
	@IsString()
	readonly serviceUuid: string;

	@ApiProperty({ required: true, example: 1592745309253, description: 'The date of the service' })
	@IsNumber()
	readonly serviceDate: number;

	@ApiProperty({ required: true, example: '7b62f49f-e13f-4de1-8f3b-68dff4f8ad05', description: 'The uuid of the deployment which leads to this record' })
	@IsString()
	readonly deploymentUuid: string;

	@ApiProperty({ required: true, example: 1592745309253, description: 'The date of the deployment' })
	@IsNumber()
	readonly deploymentDate: number;

	//TODO: update example
	@ApiProperty({
		required: true,
		example: [
			{
				key: '7b62f49f-e13f-4de1-8f3b-68dff4f8ad05',
				events: {
					close: [],
					disconnect: [],
					error: [],
					exit: [],
					message: []
				},
				stdout: {
					close: [],
					data: [],
					end: [],
					error: [],
					pause: [],
					resume: []
				},
				stderr: {
					close: [],
					data: [],
					end: [],
					error: [],
					pause: [],
					resume: []
				}
			}
		],
		description: 'Information about the process.'
	})
	@Type(() => ConsumptionDto)
	@IsArray()
	readonly consumptionList: ConsumptionDto[];
}
