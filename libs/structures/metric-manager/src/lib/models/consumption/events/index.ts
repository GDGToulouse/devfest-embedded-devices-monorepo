import { ProcessEventsClose } from './close';

export * from './close';
export * from './disconnect';
export * from './error';
export * from './exit';
export * from './message';

export interface ProcessEvents {
	close: ProcessEventsClose[];
	disconnect: { data: any; uuid: string; date: number }[];
	error: { data: Error; uuid: string; date: number }[];
	exit: { data: number; uuid: string; date: number }[];
	message: { data: any; uuid: string; date: number }[];
}
