import { NodePid } from '../node-pid';
import { NodePouchdb } from '../node-pouchdb';
import { Tree as ComponentsExpansionPanelTree } from '@gdgtoulouse/components/expansion-panel';
import Pouchdb from 'pouchdb';

// useless except to prevent the import removal from vscode organize imports extension
type PouchdbType = typeof Pouchdb;

export type Tree = ComponentsExpansionPanelTree<NodePouchdb, NodePid>;
