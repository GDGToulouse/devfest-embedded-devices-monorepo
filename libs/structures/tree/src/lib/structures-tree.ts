export interface Tree<T> {
	data?: T;
	children?: Tree<T>[];
}

export const forEachTree = <T>(tree: Tree<T>, command: (tree: Tree<T>, step: number) => T, step = 0): Tree<T> => ({
	data: command(tree, step),
	children: Array.isArray(tree.children) && tree.children.length > 0 ? tree.children.map((child) => forEachTree<T>(child, command, step + 1)) : undefined
});
