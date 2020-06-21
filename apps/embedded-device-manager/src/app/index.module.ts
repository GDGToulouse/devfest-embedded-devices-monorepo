import { IndexComponent } from './components/index.component';
import { Effects } from './effects';
import {
	metaReducers,
	reducers
	} from './reducers';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { IndexModule as ProcessingsIndexModule } from '@gdgtoulouse/features/processings';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
	bootstrap: [IndexComponent],
	declarations: [IndexComponent],
	imports: [
		BrowserAnimationsModule,
		EffectsModule.forRoot(Effects),
		HttpClientModule,
		ProcessingsIndexModule,
		RouterModule.forRoot(
			[
				{
					path: '',
					loadChildren: () => import('@gdgtoulouse/apps/embedded-device-manager/routes/route').then((module) => module.IndexModule)
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
	providers: []
})
export class IndexModule {}
