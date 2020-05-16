import { IndexComponent } from './components/index.component';
import { Effects } from './effects';
import { indexName } from './index.config';
import { reducers } from './reducers';
import { RouteResolverService as router } from './resolvers/route.resolver.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IndexModule as PouchdbManagerFeatureModule } from '@gdgtoulouse/features/pouchdb-manager';
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
						path: 'changes-options',
						loadChildren: () => import('@gdgtoulouse/apps/embedded-device-manager/routes/routes/pouchdb-manager/routes/changes-options/route').then((module) => module.IndexModule)
					},
					{
						path: 'changes-feeds',
						loadChildren: () => import('@gdgtoulouse/apps/embedded-device-manager/routes/routes/pouchdb-manager/routes/changes-feeds/route').then((module) => module.IndexModule)
					},
					{
						path: 'database-configurations',
						loadChildren: () => import('@gdgtoulouse/apps/embedded-device-manager/routes/routes/pouchdb-manager/routes/database-configurations/route').then((module) => module.IndexModule)
					},
					{
						path: 'find-selectors',
						loadChildren: () => import('@gdgtoulouse/apps/embedded-device-manager/routes/routes/pouchdb-manager/routes/find-selectors/route').then((module) => module.IndexModule)
					},
					{
						path: '**',
						redirectTo: ''
					}
				]
			}
		]),
		StoreModule.forFeature(indexName, reducers),
		EffectsModule.forFeature(Effects),
		FormsModule,
		NgSelectModule,
		PouchdbManagerFeatureModule
	],
	providers: [router]
})
export class IndexModule {}
