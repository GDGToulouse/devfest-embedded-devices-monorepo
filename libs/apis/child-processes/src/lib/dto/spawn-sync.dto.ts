import { ApiProperty } from '@nestjs/swagger';
import { StdioOptions } from 'child_process';
import { Type } from 'class-transformer';
import {
	IsArray,
	IsString,
	ValidateNested
	} from 'class-validator';

/* References:
 * - https://nodejs.org/api/child_process.html#child_process_child_process_spawnsync_command_args_options
 */

export class KeyValuePairStringString {
	@ApiProperty({ description: 'The key as string.' })
	@IsString()
	readonly key: string;

	@ApiProperty({ description: 'The value as string.' })
	@IsString()
	readonly value: string;
}

export class SpawnSyncOptionsClass {
	@ApiProperty({ required: false, description: 'Current working directory of the child process.' })
	@IsString()
	readonly cwd: string;

	@ApiProperty({ required: false, description: 'The value, as string, which will be passed as stdin to the spawned process. Supplying this value will override stdio[0].' })
	@IsString()
	readonly input: string;

	@ApiProperty({ required: false, description: 'Explicitly set the value of argv[0] sent to the child process. This will be set to command if not specified.' })
	@IsString()
	readonly argv0: string;

	@ApiProperty({ required: false, description: "Child's stdio configuration as string." })
	@IsString()
	readonly stdio: StdioOptions;

	@IsArray()
	@ValidateNested({ each: true })
	@ApiProperty({ required: false, description: 'Environment key-value pairs.' })
	@Type(() => KeyValuePairStringString)
	readonly env: NodeJS.ProcessEnv;

	@ApiProperty({ required: false, description: ' Sets the user identity of the process (see setuid(2)).' })
	@IsString()
	readonly uid: number;

	@ApiProperty({ required: false, description: 'Sets the group identity of the process (see setgid(2)).' })
	@IsString()
	readonly gid: number;

	@ApiProperty({ required: false, description: 'In milliseconds the maximum amount of time the process is allowed to run. Default: undefined.' })
	@IsString()
	readonly timeout?: number;

	@ApiProperty({ required: false, description: "The signal value, as string, to be used when the spawned process will be killed. Default: 'SIGTERM'." })
	@IsString()
	readonly killSignal: NodeJS.Signals;

	@ApiProperty({ required: false, description: ' Largest amount of data in bytes allowed on stdout or stderr. If exceeded, the child process is terminated and any output is truncated. See caveat at maxBuffer and Unicode. Default: 1024 * 1024.' })
	@IsString()
	readonly maxBuffer: number;

	@ApiProperty({ required: false, description: "The encoding used for all stdio inputs and outputs. Default: 'buffer'." })
	@IsString()
	readonly encoding: string;

	@ApiProperty({ required: false, description: 'The shell to run the command in.' })
	@IsString()
	readonly shell: string;

	@ApiProperty({ required: false, description: 'No quoting or escaping of arguments is done on Windows. Ignored on Unix. This is set to true automatically when shell is specified and is CMD. Default: false.' })
	@IsString()
	readonly windowsVerbatimArguments: boolean;

	@ApiProperty({ required: false, description: 'Hide the subprocess console window that would normally be created on Windows systems. Default: false.' })
	@IsString()
	readonly windowsHide: boolean;
}

export class SpawnSyncDto {
	@ApiProperty({ required: true, example: 'pwd', description: 'The command to run.' })
	@IsString()
	readonly command: string;

	@ApiProperty({ required: false, example: ['--logical'], description: 'List of string arguments.' })
	@IsArray()
	@IsString()
	readonly args?: string[];

	@ApiProperty({ required: false, example: {}, description: 'List of string arguments.' })
	@Type(() => SpawnSyncOptionsClass)
	readonly options?: SpawnSyncOptionsClass;
}
