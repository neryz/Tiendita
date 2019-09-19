import { TestBed } from '@angular/core/testing';

import { VacantesService } from './vacantes.service';

describe('VacantesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VacantesService = TestBed.get(VacantesService);
    expect(service).toBeTruthy();
  });
});
