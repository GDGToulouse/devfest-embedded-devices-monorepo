import {
	NodePid,
	NodePouchdb,
	Tree
	} from '../models';
import {
	NodeData,
	Trigger
	} from '@gdgtoulouse/components/menu';
import {
	Destination,
	Selectors as FeaturesPouchdbManagerSelectors
	} from '@gdgtoulouse/features/pouchdb-manager';
import { treeListFromFlatNodeList } from '@gdgtoulouse/structures/tree';
import { createSelector } from '@ngrx/store';
import Pouchdb from 'pouchdb';

// useless except to prevent the import removal from vscode organize imports extension
type PouchdbType = typeof Pouchdb;

export const treeList$ = ({ destination, trigger: { description, title, icon } }: Destination & { trigger: Trigger }) =>
	createSelector(FeaturesPouchdbManagerSelectors.docList$(`langs/${destination}`), FeaturesPouchdbManagerSelectors.docList$(destination), (langDocList, docList) => [
		{
			_id: undefined,
			_rev: undefined,
			pid: undefined,
			header: {
				description,
				title,
				icon
			},
			treeList: treeListFromFlatNodeList<NodePouchdb, NodePid, NodeData>(
				'_id',
				'pid',
				docList
					.map((flatNode: Tree) => {
						const isNodeRouter = Object.keys(flatNode).includes('router');
						const langDoc = langDocList.find(({ _id }) => _id === flatNode._id);
						const hasLangDoc = langDoc !== undefined;
						if (hasLangDoc) {
							if (isNodeRouter) {
								const tree: Tree = { ...flatNode, router: { ...flatNode.router, ...langDoc } };
								return tree;
							} else {
								const tree: Tree = { ...flatNode, header: { ...flatNode.header, ...langDoc } };
								return tree;
							}
						} else {
							if (isNodeRouter) {
								const tree: Tree = { ...flatNode, router: { ...flatNode.router, text: flatNode._id } };
								return tree;
							} else {
								const tree: Tree = { ...flatNode, header: { ...flatNode.header, description: flatNode._id, title: flatNode._id } };
								return tree;
							}
						}
					})
					.sort((flatNode1: Tree, flatNode2: Tree) => (flatNode1._id < flatNode2._id ? -1 : flatNode1._id > flatNode2._id ? 1 : 0))
			)
		}
	]);

export const Selectors = { treeList$ };
