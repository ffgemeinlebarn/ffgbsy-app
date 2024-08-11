import { TestBed } from '@angular/core/testing';

import { StatistikenService } from './statistiken.service';

describe('ProduktbereicheService', () => {
    let service: StatistikenService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(StatistikenService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
