import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSubcategoryComponent } from './new-subcategory.component';

describe('NewSubcategoryComponent', () => {
  let component: NewSubcategoryComponent;
  let fixture: ComponentFixture<NewSubcategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewSubcategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSubcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
