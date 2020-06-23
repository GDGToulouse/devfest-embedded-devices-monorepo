import { KeyEventInput } from '../models';
import {
	AfterViewInit,
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	EventEmitter,
	Input,
	OnDestroy,
	Output,
	ViewChild
	} from '@angular/core';
import {
	DisplayOption,
	NgTerminal
	} from 'ng-terminal';
import { Subscription } from 'rxjs';

@Component({
	selector: 'gdgtoulouse-terminal',
	templateUrl: './index.component.html',
	styleUrls: ['./index.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class IndexComponent implements AfterViewInit, OnDestroy {
	@Input() backspaceSymbol = '\b \b';
	@Input() enterSymbol = '\r\n$ ';

	_displayOption: DisplayOption = {};
	_optionList: { key: string; value: any }[] = [];
	_prompt: string;
	_styleOption: any;
	_toWriteRowList: string[] = [];

	@Input() set displayOption(value: DisplayOption) {
		this._displayOption = value;
		if (this.ngTerminal !== undefined) {
			this.ngTerminal.setDisplayOption(value);
			this.changeDetectorRef.markForCheck();
		}
	}

	@Input() set optionList(value: { key: string; value: any }[]) {
		this._optionList = value;
		if (this.ngTerminal !== undefined) {
			value.forEach((option) => this.ngTerminal.underlying.setOption(option.key, option.value));
			this.changeDetectorRef.markForCheck();
		}
	}

	@Input() set prompt({ text }: { text: string }) {
		this._prompt = text;
		if (this.ngTerminal !== undefined) {
			this.changeDetectorRef.markForCheck();
		}
	}

	@Input() set styleOption(value: any) {
		this._styleOption = value;
		if (this.ngTerminal !== undefined) {
			this.ngTerminal.setStyle(value);
			this.changeDetectorRef.markForCheck();
		}
	}

	@Input() set toWriteRowList(value: string[]) {
		this._toWriteRowList = value;
		if (this.ngTerminal !== undefined) {
			this.ngTerminal.write(value.join(this.enterSymbol));
			this.changeDetectorRef.markForCheck();
		}
	}

	@Input() set toWriteAndSendRowList(value: string[]) {
		this._toWriteRowList = value;
		if (this.ngTerminal !== undefined) {
			this.ngTerminal.write(value.join(this.enterSymbol) + this.enterSymbol);
			this.changeDetectorRef.markForCheck();
		}
	}

	@Output() deleted = new EventEmitter<KeyEventInput>();
	@Output() destroyed = new EventEmitter<void>();
	@Output() emptyLineReached = new EventEmitter<KeyEventInput>();
	@Output() sent = new EventEmitter<KeyEventInput>();
	@Output() unmatched = new EventEmitter<KeyEventInput>();
	@Output() write = new EventEmitter<KeyEventInput>();

	@ViewChild('ngTerminal', { static: false }) ngTerminal: NgTerminal;

	subscription: Subscription;

	constructor(private changeDetectorRef: ChangeDetectorRef) {}

	ngAfterViewInit() {
		this.subscribe();
	}

	ngOnDestroy() {
		this.destroyed.emit();
		this.unsubscribe();
	}

	subscribe() {
		setTimeout(() => {
			if (this.subscription !== undefined) {
				this.unsubscribe();
			}

			this._optionList.forEach((option) => this.ngTerminal.underlying.setOption(option.key, option.value));
			this.ngTerminal.setDisplayOption(this._displayOption);
			this.ngTerminal.setStyle(this._styleOption);
			this.ngTerminal.write(this._toWriteRowList.join(this.enterSymbol));

			// deprecation lint rule is disable because the logic of the function use keyCode only as a fallback
			// check here https://caniuse.com/#search=keyboardevent.key to see when the code should completely remove the fallback logic
			// tslint:disable-next-line: deprecation
			this.subscription = this.ngTerminal.keyEventInput.subscribe(({ domEvent: { altKey: isAltKey, key, ctrlKey: isCtrlKey, keyCode, metaKey: isMetaKey, shiftKey: isShiftKey } }) => {
				const isBackspaceKey = key === 'Backspace' || keyCode === 8;
				const isEnterKey = key === 'Enter' || keyCode === 13;

				const isKeyWritable = !isAltKey && !isBackspaceKey && !isCtrlKey && !isEnterKey && !isMetaKey && !isShiftKey;

				const keyEventInput: KeyEventInput = { isAltKey, isBackspaceKey, isEnterKey, isCtrlKey, key, keyCode, isMetaKey, isKeyWritable, isShiftKey };

				if (isKeyWritable) {
					this.write.emit(keyEventInput);
					this.ngTerminal.write(key);
				} else {
					if (isBackspaceKey) {
						const thePromptIsNotImpactedByThisBackspaceEvent = this.ngTerminal.underlying.buffer.active.cursorX > 2;
						if (thePromptIsNotImpactedByThisBackspaceEvent) {
							this.deleted.emit(keyEventInput);
							this.ngTerminal.write(this.backspaceSymbol);
						} else {
							this.emptyLineReached.emit(keyEventInput);
						}
					} else if (isEnterKey) {
						this.sent.emit(keyEventInput);
						this.ngTerminal.write(this.enterSymbol);
					} else {
						this.unmatched.emit(keyEventInput);
					}
				}
			});

			this.changeDetectorRef.markForCheck();
		}, 0);
	}

	unsubscribe() {
		this.subscription.unsubscribe();
	}
}
