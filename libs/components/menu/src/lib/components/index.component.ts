import {
	Tree,
	Trigger
	} from '../models';
import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	Output
	} from '@angular/core';

@Component({
	selector: 'gdgtoulouse-menu',
	templateUrl: './index.component.html',
	styleUrls: ['./index.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class IndexComponent<I, P> {
	@Input() idKey: string;
	@Input() hrefOfActive: string;
	@Input() treeList: Tree<I, P>[];
	@Input() trigger: Trigger;

	@Output() closed2 = new EventEmitter<void | 'click' | 'keydown' | 'tab'>();
	@Output() menuClosed = new EventEmitter<void>();
	@Output() menuOpened = new EventEmitter<void>();

	@Output() afterCollapse = new EventEmitter<Tree<I, P>>();
	@Output() afterExpand = new EventEmitter<Tree<I, P>>();
	@Output() closed = new EventEmitter<Tree<I, P>>();
	@Output() destroyed = new EventEmitter<Tree<I, P>>();
	@Output() opened = new EventEmitter<Tree<I, P>>();

	trackByIdKey(index: number, tree: Tree<I, P>) {
		return tree[this.idKey];
	}
}
