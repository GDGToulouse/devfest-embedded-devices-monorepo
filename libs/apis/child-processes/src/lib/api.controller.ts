import { ApiService } from './api.service';
import { SpawnSyncDto } from './dto/spawn-sync.dto';
import {
	Body,
	Controller,
	Post
	} from '@nestjs/common';
import {
	ApiOperation,
	ApiResponse,
	ApiTags
	} from '@nestjs/swagger';

@ApiTags('child-processes')
@Controller('child-processes')
export class ApiController {
	constructor(private readonly apiService: ApiService) {}

	@Post('spawn-sync')
	@ApiOperation({ summary: 'Spawn a command synchronously' })
	@ApiResponse({ status: 403, description: 'Forbidden.' })
	async execute(@Body() spawnSyncCommandDto: SpawnSyncDto) {
		return this.apiService.spawnSync(spawnSyncCommandDto);
	}
}
