import { IndexComponent } from './components/index.component';
import { Effects } from './effects';
import { indexName } from './index.config';
import { reducers } from './reducers';
import { RouteResolverService as router } from './resolvers/route.resolver.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { IndexModule as ExpansionPanelPouchdbIndexModule } from '@gdgtoulouse/components/expansion-panel-pouchdb';
import { IndexModule as FeatureLangIndexModule } from '@gdgtoulouse/features/lang';
import { IndexModule as PouchdbManagerIndexModule } from '@gdgtoulouse/features/pouchdb-manager';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

@NgModule({
	declarations: [IndexComponent],
	imports: [
		CommonModule,
		MatButtonModule,
		MatIconModule,
		MatListModule,
		MatMenuModule,
		MatSidenavModule,
		MatToolbarModule,
		MatTooltipModule,
		MatToolbarModule,
		MatExpansionModule,
		PouchdbManagerIndexModule,
		FeatureLangIndexModule,
		ExpansionPanelPouchdbIndexModule,
		RouterModule.forChild([
			{
				path: '',
				component: IndexComponent,
				resolve: { router },
				children: [
					{
						path: 'pouchdb-manager',
						loadChildren: () => import('@gdgtoulouse/apps/embedded-device-manager/routes/routes/pouchdb-manager/route').then((module) => module.IndexModule)
					},
					{
						path: 'system/terminal',
						loadChildren: () => import('@gdgtoulouse/apps/embedded-device-manager/routes/routes/terminal/route').then((module) => module.IndexModule)
					},
					{
						path: '**',
						redirectTo: ''
					}
				]
			}
		]),
		StoreModule.forFeature(indexName, reducers),
		EffectsModule.forFeature(Effects)
	],
	providers: [router]
})
export class IndexModule {}
