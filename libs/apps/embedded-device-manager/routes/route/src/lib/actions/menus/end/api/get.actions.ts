import { indexName } from '../../../../index.config';
import { HttpErrorResponse } from '@angular/common/http';
import { Tree } from '@gdgtoulouse/structures/tree';
import {
	createAction,
	props,
	union
	} from '@ngrx/store';

export const actions = 'menus-end-api-get';

export interface TreeData {}
export interface Request {}
export type Failure = HttpErrorResponse;
export interface Response {
	tree: Tree<
		{
			_id: string;
		},
		TreeData
	>;
}

export const request = createAction(`[${indexName}][${actions}] request`, props<{ request: Request }>());
export const failure = createAction(`[${indexName}][${actions}] failure`, props<{ failure: Failure }>());
export const response = createAction(`[${indexName}][${actions}] response`, props<{ response: Response }>());

const all = union({
	request,
	failure,
	response
});
export type ActionsUnion = typeof all;
