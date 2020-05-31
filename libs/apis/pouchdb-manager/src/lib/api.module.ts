import { ApiGateway } from './api.gateway';
import { ApiService } from './api.service';
import { Module } from '@nestjs/common';

@Module({
	providers: [ApiGateway, ApiService]
})
export class ApiModule {}
