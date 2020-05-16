import { indexName } from '../../../index.config';
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

export const request = createAction(`[${indexName}][${topic}] request`);
export const failure = createAction(`[${indexName}][${topic}] failure`, props<{ failure: Failure }>());
export const response = createAction(`[${indexName}][${topic}] response`, props<{ response: Response }>());

const all = union({
	request,
	failure,
	response
});
export type ActionsUnion = typeof all;
