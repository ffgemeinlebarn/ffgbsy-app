import { TestBed } from '@angular/core/testing';

import { ProduktbereicheService } from './produktbereiche.service';

describe('ProduktbereicheService', () => {
  let service: ProduktbereicheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProduktbereicheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
