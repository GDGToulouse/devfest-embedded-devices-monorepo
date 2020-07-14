import { Injectable } from '@angular/core';
import {
	ActivatedRouteSnapshot,
	CanActivate,
	Router,
	RouterStateSnapshot
	} from '@angular/router';
import {
	KeycloakAuthGuard,
	KeycloakService
	} from 'keycloak-angular';

@Injectable()
export class IndexGuard extends KeycloakAuthGuard implements CanActivate {
	constructor(protected router: Router, protected keycloakAngular: KeycloakService) {
		super(router, keycloakAngular);
	}

	isAccessAllowed(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
		return new Promise((resolve, reject) => {
			const isAuthenticated = this.authenticated;
			console.log({ isAuthenticated });
			if (!isAuthenticated) {
				this.keycloakAngular.login().catch((e) => console.error(e));
				return reject(false);
			} else {
				const requiredRoles: string[] = route.data.roles;
				if (!requiredRoles || requiredRoles.length === 0) {
					return resolve(true);
				} else {
					if (!this.roles || this.roles.length === 0) {
						resolve(false);
					}
					resolve(requiredRoles.every((role) => this.roles.indexOf(role) > -1));
				}
			}
		});
	}
}
