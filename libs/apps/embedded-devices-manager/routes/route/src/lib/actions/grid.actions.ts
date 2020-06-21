import { indexName } from '../index.config';
import {
	createAction,
	props
	} from '@ngrx/store';

const actions = 'grid';

export const resetToInitialState = createAction(`[${indexName}][${actions}] resetToInitialState`);
export const setTemplateAreas = createAction(`[${indexName}][${actions}] setTemplateAreas`, props<{ templateAreas: string }>());
export const setTemplateColumns = createAction(`[${indexName}][${actions}] setTemplateColumns`, props<{ templateColumns: string }>());
export const setTemplateRows = createAction(`[${indexName}][${actions}] setTemplateRows`, props<{ templateRows: string }>());
