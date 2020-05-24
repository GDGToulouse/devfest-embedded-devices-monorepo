import {
	NodeHeader,
	NodeRouter
	} from '@gdgtoulouse/components/expansion-panel';
import { Selectors as FeaturesPouchdbManagerSelectors } from '@gdgtoulouse/features/pouchdb-manager';
import { treeListFromFlatNodeList } from '@gdgtoulouse/structures/tree';
import { createSelector } from '@ngrx/store';

export const treeList$ = (destinationList: string[]) =>
	createSelector(FeaturesPouchdbManagerSelectors.changesFeedsDocList$<NodeHeader>(destinationList.map((destination) => `langs/${destination}`)), FeaturesPouchdbManagerSelectors.changesFeedsDocList$<{ pid: string; header?: NodeHeader; router?: NodeRouter }>(destinationList), (langDocList, docList) =>
		treeListFromFlatNodeList<{ _id: string }, { pid: string }, { header?: NodeHeader; router?: NodeRouter }>(
			'_id',
			'pid',
			docList.map((flatNode) => {
				const isNodeRouter = Object.keys(flatNode).includes('router');
				const langDoc = langDocList.find(({ _id }) => _id === flatNode._id);
				const hasLangDoc = langDoc !== undefined;
				if (hasLangDoc) {
					if (isNodeRouter) {
						return { ...flatNode, router: { ...flatNode.router, ...langDoc } };
					} else {
						return { ...flatNode, header: { ...flatNode.header, ...langDoc } };
					}
				} else {
					if (isNodeRouter) {
						return { ...flatNode, router: { ...flatNode.router, text: flatNode._id } };
					} else {
						return { ...flatNode, header: { ...flatNode.header, description: flatNode._id, title: flatNode._id } };
					}
				}
			})
		)
	);

export const Selectors = { treeList$ };
