import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { indexName } from '../../../index.config';

export const topic = 'envs-api-get';

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
