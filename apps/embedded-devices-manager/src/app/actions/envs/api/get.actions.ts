import { indexName } from '../../../index.config';
import { HttpErrorResponse } from '@angular/common/http';
import {
	createAction,
	props
	} from '@ngrx/store';
import { KeycloakOptions } from 'keycloak-angular';

export type Role = string;

export const topic = 'api-get';

export type Failure = HttpErrorResponse;
export interface Response {
	keycloak?: {
		options?: KeycloakOptions;
	};
	roles: {
		guards: {
			keycloak: {
				canLoad: {
					isAuthenticationRequired: boolean;
					allowedList?: Role[];
					deniedList?: Role[];
					redirectUri: string;
				};
			};
		};
	};
}

export const request = createAction(`[${indexName}][${topic}] request`);
export const failure = createAction(`[${indexName}][${topic}] failure`, props<{ failure: Failure }>());
export const response = createAction(`[${indexName}][${topic}] response`, props<{ response: Response }>());
