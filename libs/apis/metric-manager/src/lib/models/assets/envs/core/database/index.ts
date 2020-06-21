export interface Database {
	name: string;
	auth?: {
		username: string;
		password: string;
	};
}
