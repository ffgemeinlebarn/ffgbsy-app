import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProduktbereicheDetailPage } from './produktbereiche-detail.page';

describe('ProduktbereicheDetailPage', () => {
    let component: ProduktbereicheDetailPage;
    let fixture: ComponentFixture<ProduktbereicheDetailPage>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [IonicModule.forRoot(), ProduktbereicheDetailPage]
        }).compileComponents();

        fixture = TestBed.createComponent(ProduktbereicheDetailPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
