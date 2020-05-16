import { NodeHeader } from '../node-header';
import { NodeRouter } from '../node-router';
import { Tree as GenericTree } from '@gdgtoulouse/structures/tree';

export type Data =
	| {
			header?: NodeHeader;
	  }
	| {
			router?: NodeRouter;
	  };

export type Tree = GenericTree<
	{
		_id: string;
	},
	Data
>;
