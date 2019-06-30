import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationwizardComponent } from './configurationwizard.component';

describe('ConfigurationwizardComponent', () => {
  let component: ConfigurationwizardComponent;
  let fixture: ComponentFixture<ConfigurationwizardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigurationwizardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurationwizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
