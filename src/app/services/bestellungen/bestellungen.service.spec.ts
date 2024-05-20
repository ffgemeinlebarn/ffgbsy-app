import { TestBed } from '@angular/core/testing';

import { BestellungenService } from './bestellungen.service';

describe('BestellungenService', () => {
  let service: BestellungenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BestellungenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
