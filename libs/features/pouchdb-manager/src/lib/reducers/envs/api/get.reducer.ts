import {
	Actions as FeatureActions,
	Envs as FeatureEnvs
	} from '../../../actions';
import { HttpStateStatus } from '@gdgtoulouse/types';
import {
	createReducer,
	on
	} from '@ngrx/store';

export interface State {
	status: HttpStateStatus;
	failure: FeatureEnvs.Api.Get.Failure;
	response: FeatureEnvs.Api.Get.Response;
}

export const initialState: State = {
	status: 'initial',
	failure: null,
	response: null
};

export const reducer = createReducer(
	initialState,
	on(
		FeatureActions.Envs.Api.Get.request,
		(state): State => ({
			...state,
			status: 'pending'
		})
	),
	on(
		FeatureActions.Envs.Api.Get.failure,
		(state, { failure }): State => ({
			...state,
			failure,
			status: 'error'
		})
	),
	on(
		FeatureActions.Envs.Api.Get.response,
		(state, { response }): State => ({
			failure: null,
			response,
			status: 'ready'
		})
	)
);
