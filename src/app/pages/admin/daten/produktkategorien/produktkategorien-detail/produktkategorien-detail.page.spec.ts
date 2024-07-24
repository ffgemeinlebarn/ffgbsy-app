import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProduktkategorienDetailPage } from './produktkategorien-detail.page';

describe('ProduktkategorienDetailPage', () => {
    let component: ProduktkategorienDetailPage;
    let fixture: ComponentFixture<ProduktkategorienDetailPage>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [IonicModule.forRoot(), ProduktkategorienDetailPage]
        }).compileComponents();

        fixture = TestBed.createComponent(ProduktkategorienDetailPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
