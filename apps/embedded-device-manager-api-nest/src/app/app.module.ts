import { ApiModule as ChildProcessesModule } from '@gdgtoulouse/apis/child-processes';
import { Module } from '@nestjs/common';

@Module({
	imports: [ChildProcessesModule]
})
export class AppModule {}
