import { indexName } from '../../../index.config';
import {
	createAction,
	props,
	union
	} from '@ngrx/store';

export const topic = 'uis-child-route-select-ng-select';

export const add = createAction(`[${indexName}][${topic}] add`, props<{ event }>()); // TODO type with ng-select $event type
export const blur = createAction(`[${indexName}][${topic}] blur`, props<{ event }>()); // TODO type with ng-select $event type
export const clear = createAction(`[${indexName}][${topic}] clear`);
export const close = createAction(`[${indexName}][${topic}] close`);
export const change = createAction(`[${indexName}][${topic}] change`, props<{ event }>()); // TODO type with ng-select $event type
export const focus = createAction(`[${indexName}][${topic}] focus`, props<{ event }>()); // TODO type with ng-select $event type
export const open = createAction(`[${indexName}][${topic}] open`);
export const remove = createAction(`[${indexName}][${topic}] remove`, props<{ event }>()); // TODO type with ng-select $event type
export const scrollToEnd = createAction(`[${indexName}][${topic}] scrollToEnd`, props<{ event }>()); // TODO type with ng-select $event type
export const search = createAction(`[${indexName}][${topic}] search`, props<{ event }>()); // TODO type with ng-select $event type

const all = union({
	add,
	blur,
	clear,
	close,
	change,
	focus,
	open,
	remove,
	scrollToEnd,
	search
});
export type ActionsUnion = typeof all;
