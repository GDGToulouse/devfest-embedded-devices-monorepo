import {
	response as envsApiGetAction,
	Response
	} from '../../actions/envs/api/get.actions';
import { Injectable } from '@angular/core';
import { ofType } from '@ngrx/effects';
import { ActionsSubject } from '@ngrx/store';
import { KeycloakService } from 'keycloak-angular';

@Injectable()
export class IndexService {
	constructor(private actionsSubject: ActionsSubject, private keycloakService: KeycloakService) {}

	public initialize() {
		//TODO adapt according to this issue evolution: https://github.com/angular/angular/issues/15088
		const promise = new Promise((resolve, reject) =>
			this.actionsSubject.pipe(ofType(envsApiGetAction)).subscribe(({ type, response }) => {
				if (type === envsApiGetAction.type) {
					resolve(response);
				} else {
					reject();
				}
			})
		).then(({ keycloak: { options } }: Response) => this.keycloakService.init(options));
		return promise;
	}
}
