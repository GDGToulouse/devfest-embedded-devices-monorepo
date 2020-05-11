import { IndexComponent } from './components/index.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

@NgModule({
	imports: [CommonModule, RouterModule, MatToolbarModule, MatExpansionModule],
	declarations: [IndexComponent],
	exports: [IndexComponent]
})
export class ComponentModule {}
