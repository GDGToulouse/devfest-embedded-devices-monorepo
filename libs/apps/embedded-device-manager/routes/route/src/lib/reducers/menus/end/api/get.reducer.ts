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
			children: [
				{
					children: [
						{
							children: [],
							data: {
								id: '0'
							}
						},
						{
							children: [],
							data: {
								id: '1'
							}
						}
					],
					data: {
						id: '2'
					}
				},
				{
					children: [
						{
							data: {
								id: '3'
							}
						},
						{
							data: {
								id: '4'
							}
						},
						{
							data: {
								id: '5'
							}
						},
						{
							data: {
								id: '6'
							}
						},
						{
							data: {
								id: '7'
							}
						}
					],
					data: {
						id: '8'
					}
				},
				{
					children: [
						{
							children: [],
							data: {
								id: '9'
							}
						},
						{
							children: [],
							data: {
								id: '10'
							}
						}
					],
					data: {
						id: '11'
					}
				},
				{
					children: [
						{
							children: [],
							data: {
								id: '12'
							}
						},
						{
							children: [],
							data: {
								id: '13'
							}
						}
					],
					data: {
						id: '14'
					}
				},
				{
					children: [
						{
							children: [],
							data: {
								id: '15'
							}
						},
						{
							children: [],
							data: {
								id: '16'
							}
						}
					],
					data: {
						id: '17'
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
