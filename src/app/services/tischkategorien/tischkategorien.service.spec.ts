import { TestBed } from '@angular/core/testing';

import { TischkategorienService } from './tischkategorien.service';

describe('TischkategorienService', () => {
  let service: TischkategorienService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TischkategorienService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
