import { indexName } from '../index.config';
import {
	createAction,
	props,
	union
	} from '@ngrx/store';

export const topic = 'index';

export const add = createAction(`[${indexName}][${topic}] add`, props<object & { label: string }>());
export const remove = createAction(`[${indexName}][${topic}] remove`, props<{ label: string }>());

const all = union({
	add,
	remove
});
export type ActionsUnion = typeof all;

export const Actions = { add, remove };
