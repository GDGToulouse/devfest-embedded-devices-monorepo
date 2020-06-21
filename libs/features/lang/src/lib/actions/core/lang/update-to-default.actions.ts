import { indexName } from '../../../index.config';
import {
	createAction,
	props
	} from '@ngrx/store';

export const topic = 'core-lang-update-to-default';

export interface Failure {}

export const requested = createAction(`[${indexName}][${topic}] requested`);
export const responded = createAction(`[${indexName}][${topic}] responded`);
export const failed = createAction(`[${indexName}][${topic}] failed`, props<{ failure: Failure }>());
