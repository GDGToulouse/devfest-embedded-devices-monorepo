import { SpawnSyncDto } from './dto/spawn-sync.dto';
import { Injectable } from '@nestjs/common';
import { spawnSync } from 'child_process';

@Injectable()
export class ApiService {
	spawnSync({ args, command, options }: SpawnSyncDto) {
		const { output, ...executionResultsWithoutOutput } = spawnSync(command, args, options);
		const executionResultsWithoutOutputAndWithStdsAsString = {
			...executionResultsWithoutOutput,
			stderr: executionResultsWithoutOutput.stderr.toString(),
			stdout: executionResultsWithoutOutput.stdout.toString()
		};
		return executionResultsWithoutOutputAndWithStdsAsString;
	}
}
