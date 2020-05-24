import { Effects } from './effects';
import { indexName } from './index.config';
import { reducers } from './reducers';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IndexModule as FeatureRouterIndexModule } from '@gdgtoulouse/features/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

@NgModule({
	imports: [CommonModule, FeatureRouterIndexModule, StoreModule.forFeature(indexName, reducers), EffectsModule.forFeature(Effects)]
})
export class IndexModule {}
