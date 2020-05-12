import { Tree } from '../models';
import {
  Component,
  EventEmitter,
  Input,
  Output
  } from '@angular/core';

@Component({
	selector: 'gdgtoulouse-expansion-panel',
	templateUrl: './index.component.html',
	styleUrls: ['./index.component.scss']
})
export class IndexComponent {
	@Input() treeList: Tree[];

	@Output() afterCollapse: EventEmitter<string>;
	@Output() afterExpand: EventEmitter<string>;
	@Output() closed: EventEmitter<string>;
	@Output() destroyed: EventEmitter<string>;
	@Output() opened: EventEmitter<string>;

	hasTree = (tree: Tree) => !!tree.treeList && tree.treeList.length > 0;
}
