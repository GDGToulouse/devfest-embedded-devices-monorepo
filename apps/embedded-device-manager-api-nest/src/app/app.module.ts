import { IndexModule as ChildProcessesModule } from '@gdgtoulouse/apis/child-processes';
import { IndexModule as PouchdbManagerModule } from '@gdgtoulouse/apis/pouchdb-manager';
import { Module } from '@nestjs/common';

@Module({
	imports: [ChildProcessesModule, PouchdbManagerModule]
})
export class AppModule {}
