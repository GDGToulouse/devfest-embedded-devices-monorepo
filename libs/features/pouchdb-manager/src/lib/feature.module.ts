import { Effects } from './effects';
import { featureName } from './feature.config';
import { reducers } from './reducers';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

@NgModule({
	imports: [CommonModule, StoreModule.forFeature(featureName, reducers), EffectsModule.forFeature(Effects)]
})
export class FeatureModule {}
