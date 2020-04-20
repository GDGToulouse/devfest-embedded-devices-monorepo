import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpansionPanelTreeComponent } from './expansion-panel-tree.component';

describe('ExpansionPanelTreeComponent', () => {
  let component: ExpansionPanelTreeComponent;
  let fixture: ComponentFixture<ExpansionPanelTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpansionPanelTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpansionPanelTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
