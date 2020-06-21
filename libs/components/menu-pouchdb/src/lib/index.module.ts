import { IndexComponent } from './components/index.component';
import { Effects } from './effects';
import { indexName } from './index.config';
import { reducers } from './reducers';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IndexModule as MenuIndexModule } from '@gdgtoulouse/components/menu';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

@NgModule({
	imports: [CommonModule, MenuIndexModule, StoreModule.forFeature(indexName, reducers), EffectsModule.forFeature(Effects)],
	declarations: [IndexComponent],
	exports: [IndexComponent]
})
export class IndexModule {}
