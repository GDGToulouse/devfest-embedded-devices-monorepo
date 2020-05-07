import { IndexComponent } from './components/index.component';
import { Effects } from './effects';
import { featureName } from './feature.config';
import { reducers } from './reducers';
import { RouteResolverService as router } from './resolvers/route.resolver.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
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
				children: [
					{
						path: 'changes-configurations',
						loadChildren: () => import('@gdgtoulouse/apps/embedded-device-manager/routes/routes/pouchdb-manager/routes/changes-configurations/route').then((module) => module.FeatureModule)
					},
					{
						path: 'changes-feeds',
						loadChildren: () => import('@gdgtoulouse/apps/embedded-device-manager/routes/routes/pouchdb-manager/routes/changes-feeds/route').then((module) => module.FeatureModule)
					},
					{
						path: 'database-configurations',
						loadChildren: () => import('@gdgtoulouse/apps/embedded-device-manager/routes/routes/pouchdb-manager/routes/database-configurations/route').then((module) => module.FeatureModule)
					},
					{
						path: 'find-selectors',
						loadChildren: () => import('@gdgtoulouse/apps/embedded-device-manager/routes/routes/pouchdb-manager/routes/find-selectors/route').then((module) => module.FeatureModule)
					},
					{
						path: '**',
						redirectTo: ''
					}
				]
			}
		]),
		StoreModule.forFeature(featureName, reducers),
		EffectsModule.forFeature(Effects),
		FormsModule,
		NgSelectModule
	],
	providers: [router]
})
export class FeatureModule {}
