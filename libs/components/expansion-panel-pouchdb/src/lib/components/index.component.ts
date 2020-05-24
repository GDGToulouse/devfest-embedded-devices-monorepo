import { Actions as FeatureActions } from '../actions';
import { Selectors as FeatureSelectors } from '../selectors';
import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	OnInit,
	Output
	} from '@angular/core';
import { Tree } from '@gdgtoulouse/components/expansion-panel';
import { SubscriptionConfig as FeaturePouchdbManagerSubscriptionConfig } from '@gdgtoulouse/features/pouchdb-manager';
import {
	select,
	Store
	} from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
	selector: 'gdgtoulouse-expansion-panel-pouchdb',
	templateUrl: './index.component.html',
	styleUrls: ['./index.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class IndexComponent implements OnInit {
	@Input() subscriptionConfig: FeaturePouchdbManagerSubscriptionConfig;
	@Input() langSubscriptionConfig: FeaturePouchdbManagerSubscriptionConfig;

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
		this.treeList$ = this.store.pipe(select(FeatureSelectors.treeList$(this.subscriptionConfig.destinationList)));
		this.store.dispatch(FeatureActions.Pouchdb.Init.SyncNullTreeList.exec({ langSubscriptionConfig: this.langSubscriptionConfig, subscriptionConfig: this.subscriptionConfig }));
	}

	_afterCollapse(tree: Tree) {
		this.afterCollapse.emit({ tree });
		this.store.dispatch(FeatureActions.Ui.ExpansionPanel.AfterCollapse.exec({ langSubscriptionConfig: this.langSubscriptionConfig, subscriptionConfig: this.subscriptionConfig, tree }));
	}
	_afterExpand(tree: Tree) {
		this.afterExpand.emit({ tree });
		this.store.dispatch(FeatureActions.Ui.ExpansionPanel.AfterExpand.exec({ langSubscriptionConfig: this.langSubscriptionConfig, subscriptionConfig: this.subscriptionConfig, tree }));
	}
	_closed(tree: Tree) {
		this.closed.emit({ tree });
		this.store.dispatch(FeatureActions.Ui.ExpansionPanel.Closed.exec({ langSubscriptionConfig: this.langSubscriptionConfig, subscriptionConfig: this.subscriptionConfig, tree }));
	}
	_destroyed(tree: Tree) {
		this.destroyed.emit({ tree });
		this.store.dispatch(FeatureActions.Ui.ExpansionPanel.Destroyed.exec({ langSubscriptionConfig: this.langSubscriptionConfig, subscriptionConfig: this.subscriptionConfig, tree }));
	}
	_opened(tree: Tree) {
		this.opened.emit({ tree });
		this.store.dispatch(FeatureActions.Ui.ExpansionPanel.Opened.exec({ langSubscriptionConfig: this.langSubscriptionConfig, subscriptionConfig: this.subscriptionConfig, tree }));
	}
}
