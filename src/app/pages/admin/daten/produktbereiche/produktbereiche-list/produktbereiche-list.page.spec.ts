import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProduktbereicheListPage } from './produktbereiche-list.page';

describe('ProduktbereicheListPage', () => {
    let component: ProduktbereicheListPage;
    let fixture: ComponentFixture<ProduktbereicheListPage>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [IonicModule.forRoot(), ProduktbereicheListPage]
        }).compileComponents();

        fixture = TestBed.createComponent(ProduktbereicheListPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
