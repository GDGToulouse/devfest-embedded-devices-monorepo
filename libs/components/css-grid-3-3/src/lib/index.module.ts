import { IndexComponent } from './components/index.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
	declarations: [IndexComponent],
	exports: [IndexComponent],
	imports: [CommonModule],
	providers: []
})
export class IndexModule {}
