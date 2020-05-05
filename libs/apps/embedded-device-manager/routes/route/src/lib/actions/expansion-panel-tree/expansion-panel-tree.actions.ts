import { featureName } from '../../feature.config';
import {
	createAction,
	union
} from '@ngrx/store';

const actions = 'expansion-panel-tree';

export const expand = createAction(`[${featureName}][${actions}] expand`);
export const collapse = createAction(`[${featureName}][${actions}] collapse`);
export const navigate = createAction(`[${featureName}][${actions}] navigate`);

const all = union({
	expand,
	collapse,
	navigate
});
export type ActionsUnion = typeof all;