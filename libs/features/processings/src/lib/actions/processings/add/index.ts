import { indexName } from '../../../index.config';
import {
	createAction,
	props
	} from '@ngrx/store';

export const topic = 'add';

export const exec = createAction(`[${indexName}][${topic}] exec`, props<object & { label: string }>());
