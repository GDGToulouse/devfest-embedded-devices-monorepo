import { ProcessEvents } from './events';
import { ProcessStderr } from './stderr';
import { ProcessStdout } from './stdout';

export * from './events';
export * from './stderr';
export * from './stdout';

export interface Consumption {
	date: number;
	uuid: string;
	events: ProcessEvents;
	stdout: ProcessStdout;
	stderr: ProcessStderr;
}
