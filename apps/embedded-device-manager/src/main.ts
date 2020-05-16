import { IndexModule } from './app/index.module';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

enableProdMode();

platformBrowserDynamic()
	.bootstrapModule(IndexModule)
	.catch((err) => console.error(err));
