import { Consumption } from '../consumption';
import { ChildProcessWithoutNullStreams } from 'child_process';

export interface Production {
	process: Consumption;
	spawned: ChildProcessWithoutNullStreams;
}
