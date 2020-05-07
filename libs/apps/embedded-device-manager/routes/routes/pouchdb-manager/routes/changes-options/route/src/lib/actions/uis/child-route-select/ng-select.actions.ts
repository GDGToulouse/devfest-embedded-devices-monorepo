import { featureName } from '../../../feature.config';
import {
	createAction,
	props,
	union
	} from '@ngrx/store';

export const topic = 'uis-child-route-select-ng-select';

export const add = createAction(`[${featureName}][${topic}] add`, props<{ event }>()); // TODO type with ng-select $event type
export const blur = createAction(`[${featureName}][${topic}] blur`, props<{ event }>()); // TODO type with ng-select $event type
export const clear = createAction(`[${featureName}][${topic}] clear`);
export const close = createAction(`[${featureName}][${topic}] close`);
export const change = createAction(`[${featureName}][${topic}] change`, props<{ event }>()); // TODO type with ng-select $event type
export const focus = createAction(`[${featureName}][${topic}] focus`, props<{ event }>()); // TODO type with ng-select $event type
export const open = createAction(`[${featureName}][${topic}] open`);
export const remove = createAction(`[${featureName}][${topic}] remove`, props<{ event }>()); // TODO type with ng-select $event type
export const scrollToEnd = createAction(`[${featureName}][${topic}] scrollToEnd`, props<{ event }>()); // TODO type with ng-select $event type
export const search = createAction(`[${featureName}][${topic}] search`, props<{ event }>()); // TODO type with ng-select $event type

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
