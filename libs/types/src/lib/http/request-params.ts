import { HttpParams } from '@angular/common/http';

// took from httpClient.request<T>(...) inference
export type HttpRequestParams =
	| HttpParams
	| {
			[param: string]: string | string[];
	  };
