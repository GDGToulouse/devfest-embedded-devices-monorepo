import { Consumption } from '../../../consumption';

export interface Record {
	readonly deploymentUuid: string;
	readonly deploymentDate: number;
	readonly serviceUuid: string;
	readonly serviceDate: number;
	readonly recordUuid: string;
	readonly recordDate: number;
	readonly consumptionList: Consumption[];
}
