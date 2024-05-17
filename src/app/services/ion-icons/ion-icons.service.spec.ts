import { TestBed } from '@angular/core/testing';

import { IonIconsService } from './ion-icons.service';

describe('IonIconsService', () => {
  let service: IonIconsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IonIconsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
