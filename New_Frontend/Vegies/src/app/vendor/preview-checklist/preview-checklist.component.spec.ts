import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewChecklistComponent } from './preview-checklist.component';

describe('PreviewChecklistComponent', () => {
  let component: PreviewChecklistComponent;
  let fixture: ComponentFixture<PreviewChecklistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviewChecklistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
