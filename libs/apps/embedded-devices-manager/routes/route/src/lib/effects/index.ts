import * as Envs from './envs';
import * as LangMenuList from './lang-menu-list';
import * as PouchdbManager from './pouchdb-manager';
import * as Resolver from './resolver';

export const Effects = [Envs.Api.Get.Effects, LangMenuList.Api.Get.Effects, Resolver.Resolve.Effects, PouchdbManager.InitRequest.Effects];
