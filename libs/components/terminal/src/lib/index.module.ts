import { IndexComponent } from './components/index.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgTerminalModule } from 'ng-terminal';

@NgModule({
	imports: [CommonModule, NgTerminalModule],
	declarations: [IndexComponent],
	exports: [IndexComponent]
})
export class IndexModule {}
