import { NodeRouter } from '@gdgtoulouse/components/expansion-panel';
import { Selectors as FeaturesPouchdbManagerSelectors } from '@gdgtoulouse/features/pouchdb-manager';
import { treeListFromFlatNodeList } from '@gdgtoulouse/structures/tree';
import { createSelector } from '@ngrx/store';

export const treeList$ = (destinationList: string[]) =>
	createSelector(FeaturesPouchdbManagerSelectors.changesFeedsDocList$<{ pid: string; router?: NodeRouter }>(destinationList), (docList) =>
		treeListFromFlatNodeList<{ _id: string }, { pid: string }, { router?: NodeRouter }>(
			'_id',
			'pid',
			docList.map((flatNode) => {
				console.log({ docList, flatNode });
				return Object.keys(flatNode).includes('router') ? { ...flatNode, router: { ...flatNode.router, text: flatNode._id } } : { ...flatNode, header: { description: new Date().toString(), title: new Date().toString() } };
			})
		)
	);

export const Selectors = { treeList$ };
