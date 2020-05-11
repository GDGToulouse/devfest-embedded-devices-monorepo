import { Tree } from '../models';
import {
  Component,
  Input
  } from '@angular/core';

@Component({
	selector: 'gdgtoulouse-expansion-panel',
	templateUrl: './index.component.html',
	styleUrls: ['./index.component.scss']
})
export class IndexComponent {
	@Input() treeList: Tree[];

	hasTree = (tree: Tree) => !!tree.treeList && tree.treeList.length > 0;
}
