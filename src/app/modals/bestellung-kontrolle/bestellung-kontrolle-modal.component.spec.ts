import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BestellungKontrolleModalComponent } from './bestellung-kontrolle-modal.component';

describe('BestellungKontrolleModalComponent', () => {
    let component: BestellungKontrolleModalComponent;
    let fixture: ComponentFixture<BestellungKontrolleModalComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
    imports: [BestellungKontrolleModalComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BestellungKontrolleModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
