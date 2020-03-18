import { featureName } from '../../../feature.config';
import { HttpErrorResponse } from '@angular/common/http';
import {
	createAction,
	props,
	union
	} from '@ngrx/store';

export const topic = 'lang-menu-list-api-get';

export type Failure = HttpErrorResponse;
export interface ResponseItem {
	id: string;
}
export type Response = ResponseItem[];

export const request = createAction(`[${featureName}][${topic}] request`);
export const failure = createAction(`[${featureName}][${topic}] failure`, props<{ failure: Failure }>());
export const response = createAction(`[${featureName}][${topic}] response`, props<{ response: Response }>());

const all = union({
	request,
	failure,
	response
});
export type ActionsUnion = typeof all;
