import {
	Actions as FeatureActions,
	Menus as RouteMenus
	} from '../../../../actions';
import { HttpStateStatus } from '@gdgtoulouse/types';
import {
	createReducer,
	on
	} from '@ngrx/store';

export interface State {
	status: HttpStateStatus;
	failure: RouteMenus.End.Api.Get.Failure;
	response: RouteMenus.End.Api.Get.Response;
}

export const initialState: State = {
	status: 'initial',
	failure: null,
	response: {
		tree: {
			treeList: [
				{
					treeList: [
						{
							treeList: [],
							data: {
								_id: '0'
							}
						},
						{
							treeList: [],
							data: {
								_id: '1'
							}
						}
					],
					data: {
						_id: '2'
					}
				},
				{
					treeList: [
						{
							data: {
								_id: '3'
							}
						},
						{
							data: {
								_id: '4'
							}
						},
						{
							data: {
								_id: '5'
							}
						},
						{
							data: {
								_id: '6'
							}
						},
						{
							data: {
								_id: '7'
							}
						}
					],
					data: {
						_id: '8'
					}
				},
				{
					treeList: [
						{
							treeList: [],
							data: {
								_id: '9'
							}
						},
						{
							treeList: [],
							data: {
								_id: '10'
							}
						}
					],
					data: {
						_id: '11'
					}
				},
				{
					treeList: [
						{
							treeList: [],
							data: {
								_id: '12'
							}
						},
						{
							treeList: [],
							data: {
								_id: '13'
							}
						}
					],
					data: {
						_id: '14'
					}
				},
				{
					treeList: [
						{
							treeList: [],
							data: {
								_id: '15'
							}
						},
						{
							treeList: [],
							data: {
								_id: '16'
							}
						}
					],
					data: {
						_id: '17'
					}
				}
			]
		}
	}
};
export const reducer = createReducer(
	initialState,
	on(
		FeatureActions.Menus.End.Api.Get.request,
		(state): State => ({
			...state,
			status: 'pending',
			response: {
				tree: {}
			}
		})
	),
	on(
		FeatureActions.Menus.End.Api.Get.failure,
		(state, { failure }): State => ({
			...state,
			failure,
			status: 'error'
		})
	),
	on(
		FeatureActions.Menus.End.Api.Get.response,
		(state, { response }): State => ({
			failure: null,
			response,
			status: 'ready'
		})
	)
);
