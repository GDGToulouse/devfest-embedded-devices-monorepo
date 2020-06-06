import { async, TestBed } from '@angular/core/testing';
import { PipesObjectKeysIncludesModule } from './pipes-object-keys-includes.module';

describe('PipesObjectKeysIncludesModule', () => {
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [PipesObjectKeysIncludesModule]
		}).compileComponents();
	}));

	it('should create', () => {
		expect(PipesObjectKeysIncludesModule).toBeDefined();
	});
});
