import { featureName } from '../../../feature.config';
import { HttpErrorResponse } from '@angular/common/http';
import {
	createAction,
	props,
	union
	} from '@ngrx/store';

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

export const request = createAction(`[${featureName}][${topic}] request`);
export const failure = createAction(`[${featureName}][${topic}] failure`, props<{ failure: Failure }>());
export const response = createAction(`[${featureName}][${topic}] response`, props<{ response: Response }>());

const all = union({
	request,
	failure,
	response
});
export type ActionsUnion = typeof all;
