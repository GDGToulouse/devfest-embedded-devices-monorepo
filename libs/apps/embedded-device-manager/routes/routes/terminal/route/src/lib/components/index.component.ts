import {
	ChangeDetectionStrategy,
	Component
	} from '@angular/core';
import { KeyEventInput } from '@gdgtoulouse/components/terminal';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

@Component({
	selector: 'gdgtoulouse-libs-components-apps-embedded-device-manager-routes-routes-terminal-route-index',
	templateUrl: './index.component.html',
	styleUrls: ['./index.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class IndexComponent {
	prompt$ = of({ text: '$>' });
	toWriteRowList$ = of(['11111111111111 1 1111111111111111111111 111', '222222222222222222222222 2 22222222222222222222222  2222222222222', 'iiiiiiiiii '.repeat(3)]);
	toWriteAndSendRowList$ = of(['line1 my dear', 'here line 12', 'dcojhs dl z akdjaolixj azlkd '.repeat(10)]);
	title$ = of({ text: 'Terminal' });

	constructor(private store: Store<{}>) {}

	// TODO dispatch actions here with KeyEventInput as props
	// TODO in the reducer, rotate the stored keyEventInput according to a historySize length
	// TODO create a selector for extracting the last line typed
	// TODO in the API effect, use the previous selector to get the payload to POST to the backend

	deleted(event: KeyEventInput) {
		console.log('deleted', { event });
	}
	destroyed() {
		console.log('destroyed');
	}
	emptyLineReached(event: KeyEventInput) {
		console.log('emptyLineReached', { event });
	}
	sent(event: KeyEventInput) {
		console.log('sent', { event });
	}
	unmatched(event: KeyEventInput) {
		console.log('unmatched', { event });
	}
	write(event: KeyEventInput) {
		console.log('write', { event });
	}

	writeRowList() {
		this.toWriteRowList$ = of(['aaaaaaaaaaaaa a aaaaa a aaaaaa aaaaaa'.repeat(10)]);
	}
	writeAndSendRowList() {
		this.toWriteAndSendRowList$ = of(['bbbbbbbbbbbbb b bbbbb b bbbbbb bbbbbb'.repeat(10)]);
	}
}
