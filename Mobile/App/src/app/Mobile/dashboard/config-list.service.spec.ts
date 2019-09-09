import { TestBed } from '@angular/core/testing';

import { ConfigListService } from './config-list.service';

describe('ConfigListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConfigListService = TestBed.get(ConfigListService);
    expect(service).toBeTruthy();
  });
});
