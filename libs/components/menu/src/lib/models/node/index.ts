import { NodeHeader } from '../node-header';
import { NodeRouter } from '../node-router';

export type NodeData =
	| {
			header?: NodeHeader;
	  }
	| {
			router?: NodeRouter;
	  };
