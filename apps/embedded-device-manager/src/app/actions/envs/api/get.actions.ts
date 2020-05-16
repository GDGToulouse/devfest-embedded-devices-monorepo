import { indexName } from '../../../index.config';
import { HttpErrorResponse } from '@angular/common/http';
import {
	createAction,
	props,
	union
	} from '@ngrx/store';

export const topic = 'api-get';

export type Failure = HttpErrorResponse;
export interface Response {
	auth: {
		clientId: string;
		issuer: string;
		redirectUri: string;
		scope: string;
	};
}

export const request = createAction(`[${indexName}][${topic}] request`);
export const failure = createAction(`[${indexName}][${topic}] failure`, props<{ failure: Failure }>());
export const response = createAction(`[${indexName}][${topic}] response`, props<{ response: Response }>());

const all = union({
	request,
	failure,
	response
});
export type ActionsUnion = typeof all;
