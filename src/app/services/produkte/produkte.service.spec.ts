import { TestBed } from '@angular/core/testing';

import { ProdukteService } from './produkte.service';

describe('ProdukteService', () => {
  let service: ProdukteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProdukteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
