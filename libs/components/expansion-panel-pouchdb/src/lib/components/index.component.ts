import { Actions as FeatureActions } from '../actions';
import { Selectors as FeatureSelectors } from '../selectors';
import {
	ChangeDetectionStrategy,
	Component,
	Input,
	OnInit
	} from '@angular/core';
import { Tree } from '@gdgtoulouse/components/expansion-panel';
import { SubscriptionConfig as PouchdbManagerSubscriptionConfig } from '@gdgtoulouse/features/pouchdb-manager';
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
	@Input() subscriptionConfig: PouchdbManagerSubscriptionConfig;

	treeList$: Observable<Tree[]>;

	constructor(private store: Store<{}>) {}

	ngOnInit() {
		this.treeList$ = this.store.pipe(select(FeatureSelectors.treeList$(this.subscriptionConfig.destinationList)));
		this.store.dispatch(FeatureActions.Pouchdb.Init.SyncNullTreeList.exec({ subscriptionConfig: this.subscriptionConfig }));
	}

	afterCollapse(tree: Tree) {
		this.store.dispatch(FeatureActions.Ui.ExpansionPanel.AfterCollapse.exec({ subscriptionConfig: this.subscriptionConfig, tree }));
	}
	afterExpand(tree: Tree) {
		this.store.dispatch(FeatureActions.Ui.ExpansionPanel.AfterExpand.exec({ subscriptionConfig: this.subscriptionConfig, tree }));
	}
	closed(tree: Tree) {
		this.store.dispatch(FeatureActions.Ui.ExpansionPanel.Closed.exec({ subscriptionConfig: this.subscriptionConfig, tree }));
	}
	destroyed(tree: Tree) {
		this.store.dispatch(FeatureActions.Ui.ExpansionPanel.Destroyed.exec({ subscriptionConfig: this.subscriptionConfig, tree }));
	}
	opened(tree: Tree) {
		// this.store.dispatch(FeatureActions.Ui.ExpansionPanel.Opened.exec({ subscriptionConfig: this.subscriptionConfig, tree }));
	}
}
