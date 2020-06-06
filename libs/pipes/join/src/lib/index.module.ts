import { JoinPipe } from './pipes';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
	imports: [CommonModule],
	exports: [JoinPipe],
	declarations: [JoinPipe]
})
export class IndexModule {}
