import {
	ChangeDetectionStrategy,
	Component
	} from '@angular/core';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'gdgtoulouse-embedded-device-manager',
	styleUrls: ['./index.component.scss'],
	templateUrl: './index.component.html'
})
export class IndexComponent {}
