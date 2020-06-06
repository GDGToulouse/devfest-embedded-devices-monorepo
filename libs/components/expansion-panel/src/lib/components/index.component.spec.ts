import { IndexComponent } from './index.component';
import {
	async,
	ComponentFixture,
	TestBed
	} from '@angular/core/testing';

describe('IndexComponent', () => {
	let component: IndexComponent<{}, {}>;
	let fixture: ComponentFixture<IndexComponent<{}, {}>>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [IndexComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(IndexComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
