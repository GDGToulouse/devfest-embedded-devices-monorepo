import { IndexComponent as DefaultIndexComponent } from './components/default/index.component';
import { IndexComponent } from './components/index.component';
import { Effects } from './effects';
import { IndexGuard as KeycloakCanActivateIndexGuard } from './guards/keycloak/can-activate/index.guard';
import { IndexGuard as KeycloakCanLoadIndexGuard } from './guards/keycloak/can-load/index.guard';
import {
	metaReducers,
	reducers
	} from './reducers';
import { IndexService as InitializerService } from './services/initializer/index.service';
import { HttpClientModule } from '@angular/common/http';
import {
	APP_INITIALIZER,
	NgModule
	} from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { IndexModule as ProcessingsIndexModule } from '@gdgtoulouse/features/processings';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {
	KeycloakAngularModule,
	KeycloakService
	} from 'keycloak-angular';

@NgModule({
	bootstrap: [IndexComponent],
	declarations: [DefaultIndexComponent, IndexComponent],
	imports: [
		BrowserAnimationsModule,
		EffectsModule.forRoot(Effects),
		HttpClientModule,
		KeycloakAngularModule,
		ProcessingsIndexModule,
		RouterModule.forRoot(
			[
				{
					path: '',
					pathMatch: 'full',
					// canLoad: [KeycloakCanLoadIndexGuard],
					canActivate: [KeycloakCanActivateIndexGuard],
					component: DefaultIndexComponent
					// loadChildren: () => import('@gdgtoulouse/apps/embedded-devices-manager/routes/route').then((module) => module.IndexModule)
				},
				{
					path: '**',
					component: DefaultIndexComponent
				}
			],
			{ initialNavigation: 'enabled' }
		),
		StoreModule.forRoot(reducers, {
			runtimeChecks: {
				strictStateImmutability: true,
				strictActionImmutability: true,
				strictStateSerializability: true,
				strictActionSerializability: true
			},
			metaReducers
		}),
		StoreDevtoolsModule.instrument({
			maxAge: 5000,
			name: 'apps-embedded-device-manager'
		})
	],
	providers: [InitializerService, { provide: APP_INITIALIZER, useFactory: (initializerService: InitializerService) => () => initializerService.initialize(), deps: [InitializerService, KeycloakService], multi: true }, KeycloakCanActivateIndexGuard, KeycloakCanLoadIndexGuard]
})
export class IndexModule {}
