import * as Envs from './envs';
import * as Resolver from './resolver';
import * as Router from './router';

export const Effects = [Envs.Api.Get.Effects, Router.Navigate.To.Effects, Resolver.Resolve.Effects];
