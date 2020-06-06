import { indexName } from '../../../index.config';
import { Message } from '../../../models';
import {
	createAction,
	props
	} from '@ngrx/store';

export const topic = 'core-info-add';

export const action = createAction(`[${indexName}][${topic}]`, props<{ message: Message }>());
