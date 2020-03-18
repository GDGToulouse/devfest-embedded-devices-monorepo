import { featureName } from '../../feature.config';
import {
  createAction,
  union
  } from '@ngrx/store';

const actions = 'sidenavs-start';

export const close = createAction(`[${featureName}][${actions}] close`);
export const open = createAction(`[${featureName}][${actions}] open`);
export const toggle = createAction(`[${featureName}][${actions}] toggle`);

const all = union({
	close,
	open,
	toggle
});
export type ActionsUnion = typeof all;
