import {
	Actions as FeatureActions,
	LangMenuList as FeatureLangMenuList
	} from '../../../actions';
import { HttpStateStatus } from '@gdgtoulouse/types';
import {
	createReducer,
	on
	} from '@ngrx/store';

export interface State {
	status: HttpStateStatus;
	failure: FeatureLangMenuList.Api.Get.Failure;
	response: FeatureLangMenuList.Api.Get.Response;
}

export const initialState: State = {
	status: 'initial',
	failure: null,
	response: [{ id: 'en' }, { id: 'fr' }]
};

export const reducer = createReducer(
	initialState,
	on(
		FeatureActions.LangMenuList.Api.Get.request,
		(state): State => ({
			...state,
			status: 'pending'
		})
	),
	on(
		FeatureActions.LangMenuList.Api.Get.failure,
		(state, { failure }): State => ({
			...state,
			failure,
			status: 'error'
		})
	),
	on(
		FeatureActions.LangMenuList.Api.Get.response,
		(state, { response }): State => ({
			failure: null,
			response,
			status: 'ready'
		})
	)
);
