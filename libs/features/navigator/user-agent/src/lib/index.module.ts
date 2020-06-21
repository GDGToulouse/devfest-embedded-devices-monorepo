import { indexName } from './index.config';
import { reducers } from './reducers';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

@NgModule({
	imports: [CommonModule, StoreModule.forFeature(indexName, reducers)],
	providers: []
})
export class IndexModule {}
