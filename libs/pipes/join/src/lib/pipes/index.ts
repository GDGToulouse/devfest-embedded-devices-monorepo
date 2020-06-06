import {
	Pipe,
	PipeTransform
	} from '@angular/core';

@Pipe({
	name: 'join'
})
export class JoinPipe implements PipeTransform {
	transform(array: any[], separator: string) {
		return array.join(separator);
	}
}
