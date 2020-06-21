import { Actions as FeatureActions } from '../actions';
import { Tree } from '../models';
import { Selectors as FeatureSelectors } from '../selectors';
import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	OnInit,
	Output
	} from '@angular/core';
import { Trigger } from '@gdgtoulouse/components/menu';
import { SubscribeRequest } from '@gdgtoulouse/features/pouchdb-manager';
import {
	select,
	Store
	} from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
	selector: 'gdgtoulouse-menu-pouchdb',
	templateUrl: './index.component.html',
	styleUrls: ['./index.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class IndexComponent implements OnInit {
	@Input() subscribeRequest: SubscribeRequest;
	@Input() langSubscribeRequest: SubscribeRequest;
	@Input() hrefOfActive: string;
	@Input() trigger: Trigger = {
		description: 'ok',
		title: 'tit'
	};

	@Output() afterCollapse = new EventEmitter<{ tree: Tree }>();
	@Output() afterExpand = new EventEmitter<{ tree: Tree }>();
	@Output() closed = new EventEmitter<{ tree: Tree }>();
	@Output() destroyed = new EventEmitter<{ tree: Tree }>();
	@Output() init = new EventEmitter<void>();
	@Output() opened = new EventEmitter<{ tree: Tree }>();

	treeList$: Observable<Tree[]>;

	constructor(private store: Store<{}>) {}

	ngOnInit() {
		this.init.emit();
		this.treeList$ = this.store.pipe(select(FeatureSelectors.treeList$({ destination: this.subscribeRequest.destination, trigger: this.trigger })));
		this.store.dispatch(FeatureActions.Pouchdb.Init.SyncNullTreeList.exec({ langSubscribeRequest: this.langSubscribeRequest, subscribeRequest: this.subscribeRequest }));
	}

	_afterCollapse(tree: Tree) {
		this.afterCollapse.emit({ tree });
		this.store.dispatch(FeatureActions.Ui.Menu.AfterCollapse.exec({ langSubscribeRequest: this.langSubscribeRequest, subscribeRequest: this.subscribeRequest, tree }));
	}
	_afterExpand(tree: Tree) {
		this.afterExpand.emit({ tree });
		this.store.dispatch(FeatureActions.Ui.Menu.AfterExpand.exec({ langSubscribeRequest: this.langSubscribeRequest, subscribeRequest: this.subscribeRequest, tree }));
	}
	_closed(tree: Tree) {
		this.closed.emit({ tree });
		this.store.dispatch(FeatureActions.Ui.Menu.Closed.exec({ langSubscribeRequest: this.langSubscribeRequest, subscribeRequest: this.subscribeRequest, tree }));
	}
	_destroyed(tree: Tree) {
		this.destroyed.emit({ tree });
		this.store.dispatch(FeatureActions.Ui.Menu.Destroyed.exec({ langSubscribeRequest: this.langSubscribeRequest, subscribeRequest: this.subscribeRequest, tree }));
	}
	_opened(tree: Tree) {
		this.opened.emit({ tree });
		this.store.dispatch(FeatureActions.Ui.Menu.Opened.exec({ langSubscribeRequest: this.langSubscribeRequest, subscribeRequest: this.subscribeRequest, tree }));
	}
}
