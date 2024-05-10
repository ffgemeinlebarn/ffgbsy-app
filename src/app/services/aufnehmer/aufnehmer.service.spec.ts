import { TestBed } from '@angular/core/testing';

import { AufnehmerService } from './aufnehmer.service';

describe('AufnehmerService', () => {
  let service: AufnehmerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AufnehmerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
