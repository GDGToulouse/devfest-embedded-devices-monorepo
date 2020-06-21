import { NodeHeader } from '../node-header';
import { NodeRouter } from '../node-router';

export interface NodeData {
	header?: NodeHeader;
	router?: NodeRouter;
}
