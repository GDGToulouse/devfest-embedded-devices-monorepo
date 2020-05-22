import {
	ChangeDetectionStrategy,
	Component
	} from '@angular/core';
import { Store } from '@ngrx/store';
// import { Selectors as FeatureSelectors } from '../selectors';
@Component({
	selector: 'gdgtoulouse-libs-components-apps-embedded-device-manager-routes-routes-terminal-route-index',
	templateUrl: './index.component.html',
	styleUrls: ['./index.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class IndexComponent {
	constructor(private store: Store<{}>) {}
}
