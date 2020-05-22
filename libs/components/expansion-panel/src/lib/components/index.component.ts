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
export class IndexComponent {
	@Input() idKey: string;
	@Input() treeList: Tree[];

	@Output() afterCollapse = new EventEmitter<Tree>();
	@Output() afterExpand = new EventEmitter<Tree>();
	@Output() closed = new EventEmitter<Tree>();
	@Output() destroyed = new EventEmitter<Tree>();
	@Output() opened = new EventEmitter<Tree>();

	trackByFn(index: number, tree: Tree) {
		return tree._id;
	}
}
