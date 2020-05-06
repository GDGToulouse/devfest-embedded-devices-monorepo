import { IndexComponent } from './components/index.component';
import { Effects } from './effects';
import { featureName } from './feature.config';
import { reducers } from './reducers';
import { RouteResolverService as router } from './resolvers/route.resolver.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { ComponentModule as CssGrid3_3Module } from '@gdgtoulouse/components/css-grid-3-3';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

@NgModule({
	declarations: [IndexComponent],
	imports: [
		CommonModule,
		CssGrid3_3Module,
		MatButtonModule,
		MatIconModule,
		MatListModule,
		MatMenuModule,
		MatSidenavModule,
		MatToolbarModule,
		MatTooltipModule,
		RouterModule.forChild([
			{
				path: '',
				component: IndexComponent,
				resolve: { router },
				children: [
					{
						path: 'terminal',
						loadChildren: () => import('@gdgtoulouse/apps/embedded-device-manager/routes/routes/terminal/route').then((module) => module.FeatureModule)
					}
				]
			}
		]),
		StoreModule.forFeature(featureName, reducers),
		EffectsModule.forFeature(Effects)
	],
	providers: [router]
})
export class FeatureModule {}
