import { TestBed } from '@angular/core/testing';

import { GrundprodukteService } from './grundprodukte.service';

describe('GrundprodukteService', () => {
  let service: GrundprodukteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrundprodukteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
