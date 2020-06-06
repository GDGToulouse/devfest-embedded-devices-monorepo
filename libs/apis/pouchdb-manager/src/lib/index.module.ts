import { IndexGateway } from './index.gateway';
import { GatewayService } from './services/gateway.service';
import { SocketService } from './services/socket.service';
import { Module } from '@nestjs/common';

@Module({
	providers: [IndexGateway, GatewayService, SocketService]
})
export class IndexModule {}
