import { ProcessStderrClose } from './close';
import { ProcessStderrData } from './data';
import { ProcessStderrEnd } from './end';
import { ProcessStderrError } from './error';
import { ProcessStderrPause } from './pause';
import { ProcessStderrResume } from './resume';

export * from './close';
export * from './data';
export * from './end';
export * from './error';
export * from './pause';
export * from './resume';

export interface ProcessStderr {
	close: ProcessStderrClose[];
	data: ProcessStderrData[];
	end: ProcessStderrEnd[];
	error: ProcessStderrError[];
	pause: ProcessStderrPause[];
	resume: ProcessStderrResume[];
}
