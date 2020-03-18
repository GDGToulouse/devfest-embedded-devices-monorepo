import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { Module } from '@nestjs/common';

@Module({
	controllers: [ApiController],
	providers: [ApiService]
})
export class ApiModule {}
