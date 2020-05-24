import {
	reducer as envsApiGet,
	State as EnvsApiGet
	} from './envs/api/get.reducer';
import {
	reducer as langMenuListApiGet,
	State as LangMenuListApiGet
	} from './lang-menu-list/api/get.reducer';
import {
	reducer as menuEndApiGet,
	State as MenuEndApiGet
	} from './menus/end/api/get.reducer';
import {
	reducer as sidenavEndDb,
	State as SidenavEndDb
	} from './sidenavs/end/db.reducer';
import {
	reducer as sidenavEndUi,
	State as SidenavEndUi
	} from './sidenavs/end/ui.reducer';
import {
	reducer as sidenavStartDb,
	State as SidenavStartDb
	} from './sidenavs/start/db.reducer';
import {
	reducer as sidenavStartUi,
	State as SidenavStartUi
	} from './sidenavs/start/ui.reducer';
import { indexName } from '../index.config';
import {
	Action,
	combineReducers
	} from '@ngrx/store';

export interface FeatureState {
	envsApiGet: EnvsApiGet;
	langMenuListApiGet: LangMenuListApiGet;
	menuEndApiGet: MenuEndApiGet;
	sidenavEndDb: SidenavEndDb;
	sidenavEndUi: SidenavEndUi;
	sidenavStartDb: SidenavStartDb;
	sidenavStartUi: SidenavStartUi;
}

export interface State {
	[indexName]: FeatureState;
}

export function reducers(state: FeatureState | undefined, action: Action) {
	return combineReducers({
		envsApiGet,
		langMenuListApiGet,
		menuEndApiGet,
		sidenavEndDb,
		sidenavEndUi,
		sidenavStartDb,
		sidenavStartUi
	})(state, action);
}
