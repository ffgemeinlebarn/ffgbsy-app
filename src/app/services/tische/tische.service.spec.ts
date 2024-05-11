import { TestBed } from '@angular/core/testing';

import { TischeService } from './tische.service';

describe('TischeService', () => {
  let service: TischeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TischeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
