import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelOrdersComponent } from './cancel-orders.component';

describe('CancelOrdersComponent', () => {
  let component: CancelOrdersComponent;
  let fixture: ComponentFixture<CancelOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CancelOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
