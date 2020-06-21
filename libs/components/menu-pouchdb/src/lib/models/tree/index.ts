import { NodePid } from '../node-pid';
import { NodePouchdb } from '../node-pouchdb';
import { Tree as ComponentsMenuTree } from '@gdgtoulouse/components/menu';
import Pouchdb from 'pouchdb';

// useless except to prevent the import removal from vscode organize imports extension
type PouchdbType = typeof Pouchdb;

export type Tree = ComponentsMenuTree<NodePouchdb, NodePid>;
