import { TestBed } from '@angular/core/testing';

import { AgregarvacService } from './agregarvac.service';

describe('AgregarvacService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AgregarvacService = TestBed.get(AgregarvacService);
    expect(service).toBeTruthy();
  });
});
