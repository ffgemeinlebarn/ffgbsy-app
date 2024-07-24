import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProduktkategorienListPage } from './produktkategorien-list.page';

describe('ProduktkategorienListPage', () => {
    let component: ProduktkategorienListPage;
    let fixture: ComponentFixture<ProduktkategorienListPage>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [IonicModule.forRoot(), ProduktkategorienListPage]
        }).compileComponents();

        fixture = TestBed.createComponent(ProduktkategorienListPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
