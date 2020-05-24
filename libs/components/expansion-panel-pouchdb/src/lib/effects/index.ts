import * as ChangesFeeds from './changes-feeds';
import * as Envs from './envs';

export const Effects = [ChangesFeeds.Subscriptions.Subscribe.Effects, Envs.Api.Get.Effects];
