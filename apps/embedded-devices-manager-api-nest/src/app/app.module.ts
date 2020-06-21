import { IndexModule as ApisChildProcessesIndexModule } from '@gdgtoulouse/apis/child-processes';
import { IndexModule as ApisMetricManagerIndexModule } from '@gdgtoulouse/apis/metric-manager';
import { IndexModule as ApisPouchdbManagerIndexModule } from '@gdgtoulouse/apis/pouchdb-manager';
import { Module } from '@nestjs/common';

@Module({
	imports: [ApisChildProcessesIndexModule, ApisPouchdbManagerIndexModule, ApisMetricManagerIndexModule]
})
export class AppModule {}
