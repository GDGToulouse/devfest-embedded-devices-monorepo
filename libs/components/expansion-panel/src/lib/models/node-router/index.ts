import { QueryParamsHandling } from '@angular/router';

export interface NodeRouter {
	queryParams?: { [k: string]: any };
	fragment?: string;
	queryParamsHandling?: QueryParamsHandling;
	preserveFragment?: boolean;
	skipLocationChange?: boolean;
	replaceUrl?: boolean;
	state?: { [k: string]: any };
	routerLink?: any[];
	text?: string;
}
