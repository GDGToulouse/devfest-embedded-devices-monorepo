import { IndexModule } from './index.config';
import {
	async,
	TestBed
	} from '@angular/core/testing';

describe('IndexModule', () => {
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [IndexModule]
		}).compileComponents();
	}));

	it('should create', () => {
		expect(IndexModule).toBeDefined();
	});
});
