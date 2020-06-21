import { indexName } from '../../../index.config';
import {
	createAction,
	props
	} from '@ngrx/store';

export const topic = 'core-lang-update';

export interface Failure {}

export const action = createAction(`[${indexName}][${topic}]`, props<{ langId: string }>());
