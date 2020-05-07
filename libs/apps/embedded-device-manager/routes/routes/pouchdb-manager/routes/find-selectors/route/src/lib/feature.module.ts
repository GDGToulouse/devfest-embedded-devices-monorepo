import { IndexComponent } from './components/index.component';
import { Effects } from './effects';
import { featureName } from './feature.config';
import { reducers } from './reducers';
import { RouteResolverService as router } from './resolvers/route.resolver.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

@NgModule({
	declarations: [IndexComponent],
	imports: [
		CommonModule,
		RouterModule.forChild([
			{
				path: '',
				component: IndexComponent,
				resolve: { router },
				children: []
			}
		]),
		StoreModule.forFeature(featureName, reducers),
		EffectsModule.forFeature(Effects)
	],
	providers: [router]
})
export class FeatureModule {}
