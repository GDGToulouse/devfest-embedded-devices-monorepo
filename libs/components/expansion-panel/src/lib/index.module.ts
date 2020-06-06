import { IndexComponent } from './components/index.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { IndexModule as PipesJoinIndexModule } from '@gdgtoulouse/pipes/join';
import { IndexModule as PipesObjectKeysIncludesIndexModule } from '@gdgtoulouse/pipes/object-keys-includes';

@NgModule({
	imports: [CommonModule, RouterModule, MatCardModule, MatExpansionModule, MatIconModule, PipesObjectKeysIncludesIndexModule, PipesJoinIndexModule],
	declarations: [IndexComponent],
	exports: [IndexComponent]
})
export class IndexModule {}
