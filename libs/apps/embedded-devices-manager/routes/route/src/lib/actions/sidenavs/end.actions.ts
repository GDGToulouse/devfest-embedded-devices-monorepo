import { indexName } from '../../index.config';
import { createAction } from '@ngrx/store';

const actions = 'sidenavs-end';

export const close = createAction(`[${indexName}][${actions}] close`);
export const open = createAction(`[${indexName}][${actions}] open`);
export const toggle = createAction(`[${indexName}][${actions}] toggle`);
