import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelOrderItemsComponent } from './cancel-order-items.component';

describe('CancelOrderItemsComponent', () => {
  let component: CancelOrderItemsComponent;
  let fixture: ComponentFixture<CancelOrderItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CancelOrderItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelOrderItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
