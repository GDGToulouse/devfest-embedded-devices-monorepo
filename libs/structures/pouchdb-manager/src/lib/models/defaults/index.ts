export const setDefaults = <S, D>({ source, defaults }: { source: S; defaults: D }) => {
	return Object.keys(defaults).reduce(
		(destination, defaultKey) => {
			const sourceHasValueCorrespondingToDefaultKey = Object.keys(source).includes(defaultKey);
			if (sourceHasValueCorrespondingToDefaultKey) {
				return { ...destination, [defaultKey]: source[defaultKey] };
			} else {
				return { ...destination, [defaultKey]: defaults[defaultKey] };
			}
		},
		{ ...source }
	);
};
