import {
	Pipe,
	PipeTransform
	} from '@angular/core';

@Pipe({
	name: 'objectKeysIncludes'
})
export class ObjectKeysIncludesPipe implements PipeTransform {
	transform(obj: object, key: string) {
		return Object.keys(obj).includes(key);
	}
}
