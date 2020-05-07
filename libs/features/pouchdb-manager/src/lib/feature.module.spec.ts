import { FeatureModule } from './feature.module';
import {
	async,
	TestBed
	} from '@angular/core/testing';

describe('FeatureModule', () => {
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [FeatureModule]
		}).compileComponents();
	}));

	it('should create', () => {
		expect(FeatureModule).toBeDefined();
	});
});
