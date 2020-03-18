import { FormInputBase } from './input-base';

export interface FormInputNgSelect<X, Y, Z> extends FormInputBase<X> {
	localList: Y[];
	remoteListLength: number;
	syncing: boolean;
	start: number;
	end: number;
	failure: Z;
}
