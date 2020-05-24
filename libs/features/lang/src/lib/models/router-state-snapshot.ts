import { Params } from '@angular/router';

export interface RouterStateSnapshot {
	params: Params;
	queryParams: Params;
	url: string;
}
