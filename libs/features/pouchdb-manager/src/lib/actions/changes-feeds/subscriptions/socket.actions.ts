import { indexName } from '../../../index.config';
import {
	Destination,
	InitSocketConfig,
	KeysInterpretationAtDestination,
	Listeners
	} from '../../../models';
import {
	Keys,
	LiveSinceLastSeqEmitsChange,
	LiveSinceLastSeqEmitsCompleteInfo,
	LiveSinceLastSeqEmitsError,
	Register,
	Since0EmitsChange,
	Since0EmitsCompleteInfo,
	Since0EmitsError,
	SocketEmitsHandleConnection,
	Start
	} from '@gdgtoulouse/structures/pouchdb-manager';
import {
	createAction,
	props
	} from '@ngrx/store';

export const topic = 'changes-feeds-subscriptions-socket';

export interface InitFailure {}

export interface SubscribeFailure {}

export interface RegisterFailure {}

export interface RegisterSucceededFailure {}

export interface StartFailure {}

export interface StartSucceededFailure {}

export interface ReconnectFailure {}

export interface AddListenersSucceededFailure {}

export const initRequest = createAction(`[${indexName}][${topic}] initRequest`, props<InitSocketConfig>());
export const initSucceeded = createAction(`[${indexName}][${topic}] initSucceeded`);
export const initFailed = createAction(`[${indexName}][${topic}] initFailed`, props<{ failure: InitFailure }>());

export const subscribe = createAction(
	`[${indexName}][${topic}] subscribe`,
	props<{
		request: Register &
			Destination & {
				listeners?: Listeners;
			};
	}>()
);
export const register = createAction(
	`[${indexName}][${topic}] register`,
	props<{
		request: Register &
			Destination & {
				listeners?: Listeners;
			};
	}>()
);
export const registerEmitted = createAction(`[${indexName}][${topic}] registerEmitted`);
export const registerReceived = createAction(`[${indexName}][${topic}] registerReceived`, props<{ keys: Keys }>());
export const registerFailed = createAction(`[${indexName}][${topic}] registerFailed`, props<{ failure: RegisterFailure }>());
export const registerSucceeded = createAction(
	`[${indexName}][${topic}] registerSucceeded`,
	props<
		KeysInterpretationAtDestination & {
			listeners?: Listeners;
		}
	>()
);
export const registerSucceededFailed = createAction(`[${indexName}][${topic}] registerSucceededFailed`, props<{ failure: RegisterSucceededFailure }>());

export const start = createAction(
	`[${indexName}][${topic}] start`,
	props<{
		request: Start &
			Destination & {
				listeners?: Listeners;
			};
	}>()
);
export const startEmitted = createAction(`[${indexName}][${topic}] startEmitted`);
export const startReceived = createAction(`[${indexName}][${topic}] startReceived`, props<{ keys: Keys }>());
export const startFailed = createAction(`[${indexName}][${topic}] startFailed`, props<{ failure: StartFailure }>());
export const startSucceeded = createAction(`[${indexName}][${topic}] startSucceeded`);
export const startSucceededFailed = createAction(`[${indexName}][${topic}] startSucceededFailed`, props<{ failure: StartSucceededFailure }>());

export const addListeners = createAction(
	`[${indexName}][${topic}] addListeners`,
	props<{
		request: Keys &
			Destination & {
				listeners?: Listeners;
			};
	}>()
);
export const addListenersSucceeded = createAction(
	`[${indexName}][${topic}] addListenersSucceeded`,
	props<{
		request: Keys &
			Destination & {
				listeners?: Listeners;
			};
	}>()
);
export const addListenersSucceededFailed = createAction(`[${indexName}][${topic}] addListenersSucceeded`, props<{ failure: AddListenersSucceededFailure }>());

export const subscribeRequested = createAction(`[${indexName}][${topic}] subscribeRequested`, props<Destination>());
export const subscribeSucceeded = createAction(`[${indexName}][${topic}] subscribeSucceeded`);
export const subscribeFailed = createAction(`[${indexName}][${topic}] subscribeFailed`, props<{ failure: SubscribeFailure }>());

export const since0Succeeded = createAction(`[${indexName}][${topic}] since0Succeeded`, props<{ keys: Keys }>());

export const connect = createAction(`[${indexName}][${topic}] connect`);
export const reconnect = createAction(`[${indexName}][${topic}] reconnect`);
export const reconnectRequested = createAction(`[${indexName}][${topic}] reconnectRequested`);
export const reconnectSucceeded = createAction(`[${indexName}][${topic}] reconnectSucceeded`, props<{ keys: Keys }>());
export const reconnectFailed = createAction(`[${indexName}][${topic}] reconnectFailed`, props<{ failure: ReconnectFailure }>());

export const handleConnection = createAction(`[${indexName}][${topic}] handleConnection`, props<{ socketEmitsHandleConnection: SocketEmitsHandleConnection }>());
export const since0Change = createAction(`[${indexName}][${topic}] since0Change`, props<{ since0EmitsChange: Since0EmitsChange }>());
export const since0CompleteInfo = createAction(`[${indexName}][${topic}] since0CompleteInfo`, props<{ since0EmitsCompleteInfo: Since0EmitsCompleteInfo }>());
export const liveSinceLastSeqChange = createAction(`[${indexName}][${topic}] liveSinceLastSeqChange`, props<{ liveSinceLastSeqEmitsChange: LiveSinceLastSeqEmitsChange }>());
export const liveSinceLastSeqCompleteInfo = createAction(`[${indexName}][${topic}] liveSinceLastSeqCompleteInfo`, props<{ liveSinceLastSeqEmitsCompleteInfo: LiveSinceLastSeqEmitsCompleteInfo }>());
export const liveSinceLastSeqError = createAction(`[${indexName}][${topic}] liveSinceLastSeqError`, props<{ liveSinceLastSeqEmitsError: LiveSinceLastSeqEmitsError }>());
export const since0Error = createAction(`[${indexName}][${topic}] since0Error`, props<{ since0EmitsError: Since0EmitsError }>());

export const exception = createAction(`[${indexName}][${topic}] exception`, props<{ error: any }>());
export const disconnect = createAction(`[${indexName}][${topic}] disconnect`);
