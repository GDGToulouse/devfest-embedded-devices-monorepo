import { indexName } from '../../../index.config';
import {
	createAction,
	props
	} from '@ngrx/store';

export const topic = 'remove';

export const exec = createAction(`[${indexName}][${topic}] exec`, props<{ label: string }>());
