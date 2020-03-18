import * as End from './end.actions';
import * as Start from './start.actions';
import { featureName } from '../../feature.config';
import {
	createAction,
	union
	} from '@ngrx/store';

const actions = 'sidenavs';

export { End, Start };

export const close = createAction(`[${featureName}][${actions}] close`);

const all = union({
	close
});

export type ActionsUnion = typeof all;
