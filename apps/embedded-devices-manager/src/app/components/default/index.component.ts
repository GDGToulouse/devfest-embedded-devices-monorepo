import {
	ChangeDetectionStrategy,
	Component
	} from '@angular/core';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'gdgtoulouse-apps-embedded-devices-manager-default',
	styleUrls: ['./index.component.scss'],
	templateUrl: './index.component.html'
})
export class IndexComponent {}
