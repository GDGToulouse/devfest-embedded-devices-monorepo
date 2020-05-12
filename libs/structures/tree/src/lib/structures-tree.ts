export interface Tree<T> {
	data?: T & { _id: string };
	treeList?: Tree<T>[];
}

export type FlatNode<T> = T & { _id: string; pid: string };

export const forEachTree = <T>(tree: Tree<T>, command: (tree: Tree<T>, step: number) => T & { _id: string }, step = 0): Tree<T> => ({
	data: command(tree, step),
	treeList: Array.isArray(tree.treeList) && tree.treeList.length > 0 ? tree.treeList.map((child) => forEachTree<T>(child, command, step + 1)) : undefined
});

// ref: https://hackernoon.com/you-might-not-need-that-recursive-function-in-javascript-275651522185
export const treeListFromFlatNodeList = <T>(flatNodeList: FlatNode<T>[]) => {
	const builtTreeList: Tree<T>[] = [];
	const map: { [pid: string]: number } = {};
	flatNodeList.forEach((flatNode) => {
		if (!flatNode.pid) return builtTreeList.push(<Tree<T>>flatNode);
		let pIndex = map[flatNode.pid];
		if (typeof pIndex !== 'number') {
			pIndex = flatNodeList.findIndex(({ _id }) => _id === flatNode.pid);
			map[flatNode.pid] = pIndex;
		}
		if (!(<Tree<T>>flatNodeList[pIndex]).treeList) {
			return ((<Tree<T>>flatNodeList[pIndex]).treeList = [<Tree<T>>flatNode]);
		}
		(<Tree<T>>flatNodeList[pIndex]).treeList.push(<Tree<T>>flatNode);
	});
	return builtTreeList;
};
