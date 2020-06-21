import * as End from './end.actions';
import * as Start from './start.actions';
import { indexName } from '../../index.config';
import { createAction } from '@ngrx/store';

const actions = 'sidenavs';

export { End, Start };

export const close = createAction(`[${indexName}][${actions}] close`);
