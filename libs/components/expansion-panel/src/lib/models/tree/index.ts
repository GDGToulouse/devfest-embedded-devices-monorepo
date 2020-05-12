import { NodeHeader } from '../node-header';
import { NodeRouter } from '../node-router';
import { Tree as GenericTree } from '@gdgtoulouse/structures/tree';

export type Tree = GenericTree<{
	_id: string;
	header?: NodeHeader;
	router?: NodeRouter;
}>;
