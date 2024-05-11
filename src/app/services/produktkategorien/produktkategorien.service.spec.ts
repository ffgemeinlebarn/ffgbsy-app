import { TestBed } from '@angular/core/testing';

import { ProduktkategorienService } from './produktkategorien.service';

describe('ProduktkategorienService', () => {
  let service: ProduktkategorienService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProduktkategorienService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
