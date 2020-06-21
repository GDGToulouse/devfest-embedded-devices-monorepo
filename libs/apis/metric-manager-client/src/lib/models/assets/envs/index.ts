import { Core } from './core';
import { indexName } from '../../../index.config';

export * from './core';

export interface Envs {
	libs: {
		apis: {
			[indexName]: Core;
		};
	};
}
