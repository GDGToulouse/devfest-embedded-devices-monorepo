import { Params } from '@angular/router';
import { BaseRouterStoreState } from '@ngrx/router-store';

export type RouterStateSnapshot = BaseRouterStoreState & {
	params: Params;
	queryParams: Params;
	url: string;
};
