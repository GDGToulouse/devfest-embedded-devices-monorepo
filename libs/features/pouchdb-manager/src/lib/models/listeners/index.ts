import {
	LiveSinceLastSeqEmitsChange,
	LiveSinceLastSeqEmitsCompleteInfo,
	LiveSinceLastSeqEmitsError,
	Since0EmitsChange,
	Since0EmitsCompleteInfo,
	Since0EmitsError
	} from '@gdgtoulouse/structures/pouchdb-manager';
import { Action } from '@ngrx/store';

export interface Listeners {
	since0Change?: (since0EmitsChange: Since0EmitsChange) => Action[];
	since0CompleteInfo?: (since0EmitsCompleteInfo: Since0EmitsCompleteInfo) => Action[];
	liveSinceLastSeqChange?: (liveSinceLastSeqEmitsChange: LiveSinceLastSeqEmitsChange) => Action[];
	liveSinceLastSeqCompleteInfo?: (liveSinceLastSeqEmitsCompleteInfo: LiveSinceLastSeqEmitsCompleteInfo) => Action[];
	liveSinceLastSeqError?: (liveSinceLastSeqEmitsError: LiveSinceLastSeqEmitsError) => Action[];
	since0Error?: (since0EmitsError: Since0EmitsError) => Action[];
}
