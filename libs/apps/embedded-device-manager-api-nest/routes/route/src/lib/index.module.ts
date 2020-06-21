import config from './index.config';
import { IndexModule as ApisChildProcessesIndexModule } from '@gdgtoulouse/apis/child-processes';
import { IndexModule as ApisMetricManagerClientManagerIndexModule } from '@gdgtoulouse/apis/metric-manager-client';
import { IndexModule as ApisPouchdbManagerIndexModule } from '@gdgtoulouse/apis/pouchdb-manager';
import {
	MiddlewareConsumer,
	Module,
	NestModule,
	RequestMethod
	} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {
	Request,
	Response
	} from 'express';
import { RouterModule } from 'nest-router';

@Module({
	imports: [
		ConfigModule.forFeature(config),
		RouterModule.forRoutes([
			{
				path: '/child-processes',
				module: ApisChildProcessesIndexModule
			},
			{
				path: '/pouchdb-manager',
				module: ApisPouchdbManagerIndexModule
			},
			{
				path: '/metric-manager-client',
				module: ApisMetricManagerClientManagerIndexModule
			}
		]),
		ApisChildProcessesIndexModule,
		ApisPouchdbManagerIndexModule,
		ApisMetricManagerClientManagerIndexModule
	]
})
export class IndexModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(function logger(req: Request, res: Response, next: Function) {
				console.log(`${req.method}: ${req.url}`);
				next();
			})
			.forRoutes({ path: '/', method: RequestMethod.ALL });
	}
}
