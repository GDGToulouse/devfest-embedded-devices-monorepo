import { indexName } from '../index.config';
import {
	FeatureState,
	State
	} from '../reducers';
import {
	createFeatureSelector,
	createSelector
	} from '@ngrx/store';

//#region feature
export const getFeatureState$ = createFeatureSelector<State, FeatureState>(indexName);
//#endregion

export const envsApiGet$ = createSelector(getFeatureState$, (envs) => (envs === undefined ? undefined : envs.envsApiGet));
export const envsApiGetResponse$ = createSelector(envsApiGet$, (envsApiGet) => (envsApiGet === undefined ? undefined : envsApiGet.response));
export const envsKeycloak$ = createSelector(envsApiGetResponse$, (envsApiGetResponse) => (envsApiGetResponse === undefined ? undefined : envsApiGetResponse === null ? null : envsApiGetResponse.keycloak));
export const envsKeycloakOptions$ = createSelector(envsKeycloak$, (keycloak) => (keycloak === undefined ? undefined : keycloak === null ? null : keycloak.options));

export const Selectors = {
	envsApiGet$,
	envsApiGetResponse$,
	envsKeycloak$,
	envsKeycloakOptions$
};
