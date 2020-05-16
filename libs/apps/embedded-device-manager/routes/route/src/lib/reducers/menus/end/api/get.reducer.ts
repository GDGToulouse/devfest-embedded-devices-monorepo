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
			_id: null,
			treeList: [
				{
					treeList: [
						{
							treeList: [],
							_id: '0'
						},
						{
							treeList: [],
							_id: '1'
						}
					],
					_id: '2'
				},
				{
					treeList: [
						{
							_id: '3'
						},
						{
							_id: '4'
						},
						{
							_id: '5'
						},
						{
							_id: '6'
						},
						{
							_id: '7'
						}
					],
					_id: '8'
				},
				{
					treeList: [
						{
							treeList: [],
							_id: '9'
						},
						{
							treeList: [],
							_id: '10'
						}
					],
					_id: '11'
				},
				{
					treeList: [
						{
							treeList: [],
							_id: '12'
						},
						{
							treeList: [],
							_id: '13'
						}
					],
					_id: '14'
				},
				{
					treeList: [
						{
							treeList: [],
							_id: '15'
						},
						{
							treeList: [],
							_id: '16'
						}
					],
					_id: '17'
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
				tree: { _id: null }
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
