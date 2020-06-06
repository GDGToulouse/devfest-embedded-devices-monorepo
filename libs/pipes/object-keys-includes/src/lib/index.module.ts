import { ObjectKeysIncludesPipe } from './pipes';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
	imports: [CommonModule],
	exports: [ObjectKeysIncludesPipe],
	declarations: [ObjectKeysIncludesPipe]
})
export class IndexModule {}
