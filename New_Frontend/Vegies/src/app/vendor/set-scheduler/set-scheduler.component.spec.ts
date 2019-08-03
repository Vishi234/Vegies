import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetSchedulerComponent } from './set-scheduler.component';

describe('SetSchedulerComponent', () => {
  let component: SetSchedulerComponent;
  let fixture: ComponentFixture<SetSchedulerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetSchedulerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetSchedulerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
