export interface Tree<T> {
	data?: T;
	treeList?: Tree<T>[];
}

export const forEachTree = <T>(tree: Tree<T>, command: (tree: Tree<T>, step: number) => T, step = 0): Tree<T> => ({
	data: command(tree, step),
	treeList: Array.isArray(tree.treeList) && tree.treeList.length > 0 ? tree.treeList.map((child) => forEachTree<T>(child, command, step + 1)) : undefined
});

export const flatTreeToJson = (flatTree) => {
	// // Create root for top-level node(s)
	// const root = [];
	// // Cache found parent index
	// const map = {};
	// flat.forEach((node) => {
	// 	// No parentId means top level
	// 	if (!node.parentId) return root.push(node);
	// 	// Insert node as child of parent in flat array
	// 	let parentIndex = map[node.parentId];
	// 	if (typeof parentIndex !== 'number') {
	// 		parentIndex = flat.findIndex((el) => el.id === node.parentId);
	// 		map[node.parentId] = parentIndex;
	// 	}
	// 	if (!flat[parentIndex].children) {
	// 		return (flat[parentIndex].children = [node]);
	// 	}
	// 	flat[parentIndex].children.push(node);
	// });
	// console.log(root);
};
