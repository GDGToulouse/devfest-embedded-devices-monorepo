import { response as envsApiGetAction } from '../../../actions/envs/api/get.actions';
import { Injectable } from '@angular/core';
import {
	ActivatedRouteSnapshot,
	CanLoad,
	Route,
	Router,
	RouterStateSnapshot,
	UrlSegment
	} from '@angular/router';
import { ofType } from '@ngrx/effects';
import { ActionsSubject } from '@ngrx/store';
import {
	KeycloakAuthGuard,
	KeycloakService
	} from 'keycloak-angular';

//ref: https://github.com/mauriciovigolo/keycloak-angular/issues/87
@Injectable()
export class IndexGuard extends KeycloakAuthGuard implements CanLoad {
	constructor(private actionsSubject: ActionsSubject, protected router: Router, protected keycloakService: KeycloakService) {
		super(router, keycloakService);
	}

	canLoad(route: Route, segments: UrlSegment[]) {
		return new Promise<boolean>(async (resolve, reject) => {
			try {
				console.log({ segments, route }, window.location);
				const result = await this.checkAccessAllowed();
				resolve(result);
			} catch (error) {
				reject(error);
			}
		});
	}

	isAccessAllowed(activatedRouteSnapshot: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		return this.checkAccessAllowed();
	}

	checkAccessAllowed() {
		const promise = new Promise<boolean>((resolve, reject) =>
			this.actionsSubject.pipe(ofType(envsApiGetAction)).subscribe(
				async ({
					type,
					response: {
						roles: {
							guards: {
								keycloak: {
									canLoad: { allowedList, deniedList, isAuthenticationRequired, redirectUri }
								}
							}
						}
					}
				}) => {
					console.log({ allowedList, deniedList, isAuthenticationRequired }, window.location);
					if (type === envsApiGetAction.type) {
						try {
							if (isAuthenticationRequired === true) {
								const isLoggedIn = await this.keycloakService.isLoggedIn();
								console.log({ isLoggedIn });
								if (isLoggedIn) {
									const roleList = await this.keycloakService.getUserRoles(true);
									console.log({ roleList });
									const isAllowedListValid = Array.isArray(allowedList);
									if (isAllowedListValid) {
										const isAccessAllowed = allowedList.some((role) => roleList.includes(role));
										if (isAccessAllowed) {
											resolve();
										} else {
											reject();
										}
									} else {
										const isDeniedListValid = Array.isArray(deniedList);
										if (isDeniedListValid) {
											const isAccessDenied = roleList.some((role) => deniedList.includes(role));
											if (isAccessDenied) {
												reject();
											} else {
												resolve();
											}
										} else {
											reject();
										}
									}
								} else {
									console.log('window.location.pathname', window.location.pathname);
									console.log('window.location.href', window.location.href);
									console.log('host', window.location.host);
									console.log('hostname', window.location.hostname);
									console.log('href', window.location.href);
									console.log('hash', window.location.hash);
									console.log('origin', window.location.origin);
									console.log('pathname', window.location.pathname);
									console.log('port', window.location.port);
									console.log('protocol', window.location.protocol);
									console.log('search', window.location.search);
									const comesFromCheckSsoRedirection = window.location.hash.includes('state');
									if (comesFromCheckSsoRedirection) {
									} else {
									}
									await this.keycloakService.login({
										redirectUri
									});
									reject();
								}
							} else {
								resolve();
							}
						} catch (error) {
							console.error('checkAccessAllowed', { error });
							reject();
						}
					}
				}
			)
		);
		return promise;
	}
}
