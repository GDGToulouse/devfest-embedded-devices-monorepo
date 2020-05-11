import { NodeHeader } from '../node-header';
import { NodeRouter } from '../node-router';

export interface Tree {
	data: {
		header?: NodeHeader;
		router?: NodeRouter;
	};
	treeList: Tree[];
}
