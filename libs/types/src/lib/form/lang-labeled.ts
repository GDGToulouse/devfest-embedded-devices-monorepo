import { FormLangBase } from './lang-base';

export interface FormLangLabeled extends FormLangBase {
	label: {
		text: string;
	};
}
