import { IndexComponent } from './components/index.component';
import { Effects } from './effects';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IndexModule as ExpansionPanelIndexModule } from '@gdgtoulouse/components/expansion-panel';
import { EffectsModule } from '@ngrx/effects';
import Pouchdb from 'pouchdb';
import PouchAuthentication from 'pouchdb-authentication';
import PouchFind from 'pouchdb-find';

Pouchdb.plugin(PouchAuthentication);
Pouchdb.plugin(PouchFind);
Pouchdb.setMaxListeners(500);

@NgModule({
	imports: [CommonModule, ExpansionPanelIndexModule, EffectsModule.forFeature(Effects)],
	declarations: [IndexComponent],
	exports: [IndexComponent]
})
export class IndexModule {}
