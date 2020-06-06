import { indexName } from '../index.config';
import {
	FeatureState,
	State
	} from '../reducers';
import { Selectors as FeatureLangSelectors } from '@gdgtoulouse/features/lang';
import { Selectors as FeaturesRouterSelectors } from '@gdgtoulouse/features/router';
import {
	createFeatureSelector,
	createSelector
	} from '@ngrx/store';

//#region feature
export const getFeatureState$ = createFeatureSelector<State, FeatureState>(indexName);
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
export const sidenavStartDbLangSubscribeRequestToSuffixWithLangId$ = createSelector(sidenavStartDb$, ({ langSubscribeRequest }) => langSubscribeRequest);
export const sidenavStartDbSubscribeRequest$ = createSelector(sidenavStartDb$, ({ subscribeRequest }) => subscribeRequest);
export const sidenavStartDbLangSubscribeRequest$ = createSelector(sidenavStartDbLangSubscribeRequestToSuffixWithLangId$, <any>FeatureLangSelectors.langId$, (langSubscribeRequest, langId) => ({
	...langSubscribeRequest,
	databaseConfiguration: {
		...langSubscribeRequest.databaseConfiguration,
		name: `${langSubscribeRequest.databaseConfiguration.name}-lang-${langId}`
	}
}));
export const sidenavStartUi$ = createSelector(getFeatureState$, ({ sidenavStartUi }) => sidenavStartUi);
export const sidenavStartUiIsOpened$ = createSelector(sidenavStartUi$, ({ isOpened }) => isOpened);
//#endregion
export const sidenavStartHrefOfActive$ = createSelector(FeaturesRouterSelectors.url$, (url) => url);
//#endregion

export const Selectors = {
	langMenuListApiGet$,
	langMenuList$,
	sidenavEndDb$,
	sidenavEndUi$,
	sidenavEndUiIsOpened$,
	sidenavStartDb$,
	sidenavStartDbLangSubscribeRequestToSuffixWithLangId$,
	sidenavStartDbSubscribeRequest$,
	sidenavStartDbLangSubscribeRequest$,
	sidenavStartUi$,
	sidenavStartUiIsOpened$,
	sidenavStartHrefOfActive$
};
