import { Serializable } from 'child_process';

export interface ProcessEventsMessage {
	date: number;
	uuid: string;
	data: Serializable;
}
