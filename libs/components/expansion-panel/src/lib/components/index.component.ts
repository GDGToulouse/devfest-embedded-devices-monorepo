import { Tree } from '../models';
import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	Output
	} from '@angular/core';

@Component({
	selector: 'gdgtoulouse-expansion-panel',
	templateUrl: './index.component.html',
	styleUrls: ['./index.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class IndexComponent<I, P> {
	@Input() idKey: string;
	@Input() hrefOfActive: string;
	@Input() treeList: Tree<I, P>[];

	@Output() afterCollapse = new EventEmitter<Tree<I, P>>();
	@Output() afterExpand = new EventEmitter<Tree<I, P>>();
	@Output() closed = new EventEmitter<Tree<I, P>>();
	@Output() destroyed = new EventEmitter<Tree<I, P>>();
	@Output() opened = new EventEmitter<Tree<I, P>>();

	trackByUnderscoredId(index: number, tree: Tree<I, P>) {
		return tree[this.idKey];
	}
}
