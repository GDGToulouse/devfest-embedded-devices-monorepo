import { FeatureModule } from './app/feature.module';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


enableProdMode();

platformBrowserDynamic()
	.bootstrapModule(FeatureModule)
	.catch(err => console.error(err));
