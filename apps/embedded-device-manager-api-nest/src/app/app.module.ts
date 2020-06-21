import { IndexModule as AppsEmbeddedDeviceManagerApiNestRoutesRouteIndexModule } from '@gdgtoulouse/apps/embedded-device-manager-api-nest/routes/route';
import { Module } from '@nestjs/common';

@Module({
	imports: [AppsEmbeddedDeviceManagerApiNestRoutesRouteIndexModule]
})
export class AppModule {}
