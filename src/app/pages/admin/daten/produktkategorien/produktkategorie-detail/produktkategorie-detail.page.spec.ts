import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProduktkategorieDetailPage } from './produktkategorie-detail.page';

describe('ProduktkategorieDetailPage', () => {
    let component: ProduktkategorieDetailPage;
    let fixture: ComponentFixture<ProduktkategorieDetailPage>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [IonicModule.forRoot(), ProduktkategorieDetailPage]
        }).compileComponents();

        fixture = TestBed.createComponent(ProduktkategorieDetailPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
