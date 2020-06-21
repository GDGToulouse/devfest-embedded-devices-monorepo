import { indexName } from '../../../index.config';
import {
	createAction,
	props
	} from '@ngrx/store';

export const topic = 'core-title-set';

export const action = createAction(`[${indexName}][${topic}]`, props<{ text: string }>());
