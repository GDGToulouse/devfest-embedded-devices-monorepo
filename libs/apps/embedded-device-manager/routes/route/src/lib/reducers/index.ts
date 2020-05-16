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
	reducer as sidenavEnd,
	State as SidenavEnd
	} from './sidenavs/end.reducer';
import {
	reducer as sidenavStart,
	State as SidenavStart
	} from './sidenavs/start.reducer';
import { indexName } from '../index.config';
import {
	Action,
	combineReducers,
	createFeatureSelector
	} from '@ngrx/store';

export interface FeatureState {
	envsApiGet: EnvsApiGet;
	langMenuListApiGet: LangMenuListApiGet;
	menuEndApiGet: MenuEndApiGet;
	sidenavEnd: SidenavEnd;
	sidenavStart: SidenavStart;
}

export interface State {
	[indexName]: FeatureState;
}

export function reducers(state: FeatureState | undefined, action: Action) {
	return combineReducers({
		envsApiGet,
		langMenuListApiGet,
		menuEndApiGet,
		sidenavEnd,
		sidenavStart
	})(state, action);
}

export const getFeatureState = createFeatureSelector<State, FeatureState>(indexName);
