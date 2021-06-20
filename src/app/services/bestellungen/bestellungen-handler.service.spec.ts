import { TestBed } from '@angular/core/testing';

import { BestellungenHandlerService } from './bestellungen-handler.service';

describe('BestellungenHandlerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BestellungenHandlerService = TestBed.get(BestellungenHandlerService);
    expect(service).toBeTruthy();
  });
});
