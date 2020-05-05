import {
	reducer as envsApiGet,
	State as EnvsApiGet
	} from './envs/api/get.reducer';
import {
	reducer as grid,
	State as Grid
	} from './grid.reducer';
import {
	reducer as langMenuListApiGet,
	State as LangMenuListApiGet
	} from './lang-menu-list/api/get.reducer';
import {
	PouchdbBus as MenuDataIndexFlat,
	reducer as menuDataIndexFlat
	} from './menu-data-index-flat.reducer';
import {
	reducer as menuEndApiGet,
	State as MenuEndApiGet
	} from './menus/end/api/get.reducer';
import {
	reducer as sidenavEnd,
	State as SidenavEnd
	} from './sidenavs/end.reducer';
import {
	reducer as sidenavStart,
	State as SidenavStart
	} from './sidenavs/start.reducer';
import { featureName } from '../feature.config';
import {
	Action,
	combineReducers,
	createFeatureSelector
	} from '@ngrx/store';

export interface RouteState {
	envsApiGet: EnvsApiGet;
	grid: Grid;
	langMenuListApiGet: LangMenuListApiGet;
	menuEndApiGet: MenuEndApiGet;
	menuDataIndexFlat: MenuDataIndexFlat;
	sidenavEnd: SidenavEnd;
	sidenavStart: SidenavStart;
}

export interface State {
	[featureName]: RouteState;
}

export function reducers(state: RouteState | undefined, action: Action) {
	return combineReducers({
		envsApiGet,
		grid,
		langMenuListApiGet,
		menuEndApiGet,
		menuDataIndexFlat,
		sidenavEnd,
		sidenavStart
	})(state, action);
}

export const getFeatureState = createFeatureSelector<State, RouteState>(featureName);
