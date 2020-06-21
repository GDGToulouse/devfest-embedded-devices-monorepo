import {
	ChangeDetectionStrategy,
	Component
	} from '@angular/core';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'gdgtoulouse-apps-embedded-devices-manager',
	styleUrls: ['./index.component.scss'],
	templateUrl: './index.component.html'
})
export class IndexComponent {}
