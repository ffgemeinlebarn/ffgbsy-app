import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProdukteinteilungenDetailPage } from './produkteinteilungen-detail.page';

describe('ProdukteinteilungenDetailPage', () => {
    let component: ProdukteinteilungenDetailPage;
    let fixture: ComponentFixture<ProdukteinteilungenDetailPage>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [IonicModule.forRoot(), ProdukteinteilungenDetailPage]
        }).compileComponents();

        fixture = TestBed.createComponent(ProdukteinteilungenDetailPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
