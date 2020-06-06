import { NodeData } from '../node-data';
import { Tree as GenericTree } from '@gdgtoulouse/structures/tree';

export type Tree<I, P> = GenericTree<I, P, NodeData>;
