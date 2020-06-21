import { Doc } from '../../doc';

export type ExecutionConfig = Doc & {
	calendar?: {
		conditionList: string[];
	};
	event?: {
		name: string;
	};
	time?: {
		afterDelay: number;
	};
	repeat: {
		calendar?: {
			conditionList: string[];
		};
		event?: {
			name: string;
		};
		time?: {
			afterPeriod: number;
		};
	};
};
