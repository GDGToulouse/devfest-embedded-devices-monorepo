import { IndexController } from './index.controller';
import { IndexService } from './index.service';
import { Module } from '@nestjs/common';

@Module({
	controllers: [IndexController],
	providers: [IndexService]
})
export class IndexModule {}
