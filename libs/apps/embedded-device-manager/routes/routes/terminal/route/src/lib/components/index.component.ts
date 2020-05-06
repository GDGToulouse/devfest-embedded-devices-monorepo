import {
	AfterViewInit,
	ChangeDetectionStrategy,
	Component,
	ViewChild
	} from '@angular/core';
import { Store } from '@ngrx/store';
import { NgTerminal } from 'ng-terminal';
import { of } from 'rxjs';

@Component({
	selector: 'gdgtoulouse-libs-components-apps-embedded-device-manager-routes-routes-terminal-route-index-c',
	templateUrl: './index.component.html',
	styleUrls: ['./index.component.scss'],
	changeDetection: ChangeDetectionStrategy.Default
})
export class IndexComponent implements AfterViewInit {
	@ViewChild('term', { static: true }) child: NgTerminal;

	title$ = of({ text: 'Terminal' });

	constructor(private store: Store<{}>) {}

	ngAfterViewInit() {
		console.log(this.child);
		this.child.keyEventInput.subscribe((e) => {
			// TODO dispatch an action here with {keycode: type of e.domEvent.keyCode, key: typeof e.key} as props
			// TODO in the reducer the state will be kind of:
			// export interface State {
			// }
			// TODO in the reducer, rotate the stored keyEventInput according to a historySize length
			// TODO create a selector for extracting the last characters typed since the last "enter" typed (keycode 13)
			// TODO in the API effect, use the previous selector to get the payload to POST to the backend

			console.log('keyboard event:' + e.domEvent.keyCode + ', ' + e.key);

			const ev = e.domEvent;
			const printable = !ev.altKey && !ev.ctrlKey && !ev.metaKey;

			if (ev.keyCode === 13) {
				this.child.write('\r\n$ ');
			} else if (ev.keyCode === 8) {
				// Do not delete the prompt
				if (this.child.underlying.buffer.active.cursorX > 2) {
					this.child.write('\b \b');
				}
			} else if (printable) {
				this.child.write(e.key);
			}
		});
		// TODO do the same as keyEventInput for keyInput
	}
}
