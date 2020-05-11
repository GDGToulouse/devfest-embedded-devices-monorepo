import { ComponentModule } from './component.module';
import {
	async,
	TestBed
	} from '@angular/core/testing';

describe('ComponentModule', () => {
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [ComponentModule]
		}).compileComponents();
	}));

	it('should create', () => {
		expect(ComponentModule).toBeDefined();
	});
});
