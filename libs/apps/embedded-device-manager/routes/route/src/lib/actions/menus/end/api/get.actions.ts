import { featureName } from '../../../../feature.config';
import { HttpErrorResponse } from '@angular/common/http';
import { Tree } from '@gdgtoulouse/structures/tree';
import {
	createAction,
	props,
	union
	} from '@ngrx/store';

export const actions = 'menus-end-api-get';

export interface TreeData {
	id: string;
}
export interface Request {}
export type Failure = HttpErrorResponse;
export interface Response {
	tree: Tree<TreeData>;
}

export const request = createAction(`[${featureName}][${actions}] request`, props<{ request: Request }>());
export const failure = createAction(`[${featureName}][${actions}] failure`, props<{ failure: Failure }>());
export const response = createAction(`[${featureName}][${actions}] response`, props<{ response: Response }>());

const all = union({
	request,
	failure,
	response
});
export type ActionsUnion = typeof all;
