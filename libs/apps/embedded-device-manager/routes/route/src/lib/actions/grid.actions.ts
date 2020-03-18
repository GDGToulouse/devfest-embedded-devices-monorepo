import { featureName } from '../feature.config';
import {
  createAction,
  props,
  union
  } from '@ngrx/store';

const actions = 'grid';

export const resetToInitialState = createAction(`[${featureName}][${actions}] resetToInitialState`);
export const setTemplateAreas = createAction(`[${featureName}][${actions}] setTemplateAreas`, props<{ templateAreas: string }>());
export const setTemplateColumns = createAction(`[${featureName}][${actions}] setTemplateColumns`, props<{ templateColumns: string }>());
export const setTemplateRows = createAction(`[${featureName}][${actions}] setTemplateRows`, props<{ templateRows: string }>());

const all = union({
	resetToInitialState,
	setTemplateAreas,
	setTemplateColumns,
	setTemplateRows
});
export type ActionsUnion = typeof all;
