import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IndexComponent } from './components/index.component';

@NgModule({
	declarations: [IndexComponent],
	exports: [IndexComponent],
	imports: [CommonModule],
	providers: []
})
export class ComponentModule {}
