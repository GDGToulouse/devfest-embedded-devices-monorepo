import { ProcessStdoutClose } from './close';
import { ProcessStdoutData } from './data';
import { ProcessStdoutEnd } from './end';
import { ProcessStdoutError } from './error';
import { ProcessStdoutPause } from './pause';
import { ProcessStdoutResume } from './resume';

export * from './close';
export * from './data';
export * from './end';
export * from './error';
export * from './pause';
export * from './resume';

export interface ProcessStdout {
	close: ProcessStdoutClose[];
	data: ProcessStdoutData[];
	end: ProcessStdoutEnd[];
	error: ProcessStdoutError[];
	pause: ProcessStdoutPause[];
	resume: ProcessStdoutResume[];
}
