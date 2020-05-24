import { Menus as RouteMenus } from '../actions';
import { indexName } from '../index.config';
import {
	FeatureState,
	State
	} from '../reducers';
import { Selectors as FeatureLangSelectors } from '@gdgtoulouse/features/lang';
import { forEachTree } from '@gdgtoulouse/structures/tree';
import {
	createFeatureSelector,
	createSelector
	} from '@ngrx/store';

//#region feature
export const getFeatureState$ = createFeatureSelector<State, FeatureState>(indexName);
//#endregion

//#region menus
export const menuEndApiGetResponseTree$ = createSelector(
	getFeatureState$,
	({
		menuEndApiGet: {
			response: { tree }
		}
	}) => tree
);
export const menuEndTree$ = createSelector(menuEndApiGetResponseTree$, (rootTree) =>
	forEachTree<{ _id: string }, RouteMenus.End.Api.Get.TreeData>(rootTree, (subTree, step) => ({
		...subTree,
		step
	}))
);
//#endregion

//#region langMenuList
export const langMenuListApiGet$ = createSelector(getFeatureState$, ({ langMenuListApiGet }) => langMenuListApiGet);
export const langMenuList$ = createSelector(langMenuListApiGet$, ({ response: menuList }) => menuList);
//#endregion

//#region sidenavs
//#region sidenavsEnd
export const sidenavEndDb$ = createSelector(getFeatureState$, ({ sidenavEndDb }) => sidenavEndDb);
export const sidenavEndUi$ = createSelector(getFeatureState$, ({ sidenavEndUi }) => sidenavEndUi);
export const sidenavEndUiIsOpened$ = createSelector(sidenavEndUi$, ({ isOpened }) => isOpened);
//#endregion
//#region sidenavsStart
export const sidenavStartDb$ = createSelector(getFeatureState$, ({ sidenavStartDb }) => sidenavStartDb);
export const sidenavStartDbLangSubscriptionConfigToSuffixWithLangId$ = createSelector(sidenavStartDb$, ({ langSubscriptionConfig }) => langSubscriptionConfig);
export const sidenavStartDbSubscriptionConfig$ = createSelector(sidenavStartDb$, ({ subscriptionConfig }) => subscriptionConfig);
export const sidenavStartDbLangSubscriptionConfig$ = createSelector(sidenavStartDbLangSubscriptionConfigToSuffixWithLangId$, <any>FeatureLangSelectors.langId$, (langSubscriptionConfig, langId) => ({
	...langSubscriptionConfig,
	databaseConfiguration: {
		...(<PouchDB.Configuration.DatabaseConfiguration>langSubscriptionConfig.databaseConfiguration),
		name: `${(<PouchDB.Configuration.DatabaseConfiguration>langSubscriptionConfig.databaseConfiguration).name}-lang-${langId}`
	}
}));
export const sidenavStartUi$ = createSelector(getFeatureState$, ({ sidenavStartUi }) => sidenavStartUi);
export const sidenavStartUiIsOpened$ = createSelector(sidenavStartUi$, ({ isOpened }) => isOpened);
//#endregion
//#endregion

export const Selectors = {
	langMenuListApiGet$,
	langMenuList$,
	menuEndApiGetResponseTree$,
	menuEndTree$,
	sidenavEndDb$,
	sidenavEndUi$,
	sidenavEndUiIsOpened$,
	sidenavStartDb$,
	sidenavStartDbLangSubscriptionConfigToSuffixWithLangId$,
	sidenavStartDbSubscriptionConfig$,
	sidenavStartDbLangSubscriptionConfig$,
	sidenavStartUi$,
	sidenavStartUiIsOpened$
};
