import { IndexComponent } from './components/index.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { IndexModule as PipesJoinIndexModule } from '@gdgtoulouse/pipes/join';
import { IndexModule as PipesObjectKeysIncludesIndexModule } from '@gdgtoulouse/pipes/object-keys-includes';

@NgModule({
	imports: [CommonModule, RouterModule, MatMenuModule, MatButtonModule, MatCardModule, MatExpansionModule, MatIconModule, PipesJoinIndexModule, PipesObjectKeysIncludesIndexModule],
	declarations: [IndexComponent],
	exports: [IndexComponent]
})
export class IndexModule {}
