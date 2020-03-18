import { HttpRequestPaginationSort } from './request-pagination-sort';

export interface HttpRequestPagination {
	page: number;
	size: number;
	sort: HttpRequestPaginationSort;
}
