import { indexName } from '../../../index.config';
import { HttpErrorResponse } from '@angular/common/http';
import {
	createAction,
	props
	} from '@ngrx/store';

export const topic = 'envs-api-get';

export type Failure = HttpErrorResponse;
export interface Response {}

export const request = createAction(`[${indexName}][${topic}] request`);
export const failure = createAction(`[${indexName}][${topic}] failure`, props<{ failure: Failure }>());
export const response = createAction(`[${indexName}][${topic}] response`, props<{ response: Response }>());
