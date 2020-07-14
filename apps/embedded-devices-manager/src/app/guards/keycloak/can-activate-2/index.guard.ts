import { response as envsApiGetAction } from '../../../actions/envs/api/get.actions';
import { Injectable } from '@angular/core';
import {
	ActivatedRouteSnapshot,
	CanActivate,
	Router,
	RouterStateSnapshot
	} from '@angular/router';
import { ofType } from '@ngrx/effects';
import { ActionsSubject } from '@ngrx/store';
import {
	KeycloakAuthGuard,
	KeycloakService
	} from 'keycloak-angular';
import { of } from 'rxjs';
import {
	switchMap,
	tap
	} from 'rxjs/operators';

//ref: https://github.com/mauriciovigolo/keycloak-angular/issues/87
@Injectable()
export class IndexGuard extends KeycloakAuthGuard implements CanActivate {
	constructor(private actionsSubject: ActionsSubject, protected router: Router, protected keycloakService: KeycloakService) {
		super(router, keycloakService);
	}

	isAccessAllowed(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		return this.checkAccessAllowed();
	}

	checkAccessAllowed() {
		console.log('here');
		const promise = this.actionsSubject
			.pipe(
				ofType(envsApiGetAction),
				tap(
					({
						response: {
							roles: {
								guards: {
									keycloak: {
										canLoad: { isAuthenticationRequired, allowedList, deniedList }
									}
								}
							}
						}
					}) => {
						console.log({ allowedList, deniedList, isAuthenticationRequired });
						try {
							if (isAuthenticationRequired === true) {
								const isAuthenticated = this.authenticated;
								console.log({ isAuthenticated });
								if (isAuthenticated) {
									const roleList = this.roles;
									console.log({ roleList });
									const isAllowedListValid = Array.isArray(allowedList);
									if (isAllowedListValid) {
										const isAccessAllowed = allowedList.some((role) => roleList.includes(role));
										return isAccessAllowed;
									} else {
										const isDeniedListValid = Array.isArray(deniedList);
										if (isDeniedListValid) {
											const isAccessDenied = roleList.some((role) => deniedList.includes(role));
											return !isAccessDenied;
										} else {
											return false;
										}
									}
								} else {
									this.keycloakService.login().catch((e) => console.error(e));
									return false;
								}
							} else {
								return true;
							}
						} catch (error) {
							console.error('checkAccessAllowed', { error });
							return false;
						}
					}
				),
				switchMap((_) => of(true))
			)
			.toPromise();
		return promise;
	}
}
