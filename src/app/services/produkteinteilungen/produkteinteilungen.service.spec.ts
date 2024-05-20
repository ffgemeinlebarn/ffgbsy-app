import { TestBed } from '@angular/core/testing';

import { ProdukteinteilungenService } from './produkteinteilungen.service';

describe('ProdukteinteilungenService', () => {
  let service: ProdukteinteilungenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProdukteinteilungenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
