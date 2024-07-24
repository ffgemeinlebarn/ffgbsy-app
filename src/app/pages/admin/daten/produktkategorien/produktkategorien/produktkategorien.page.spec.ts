import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProduktkategorienPage } from './produktkategorien.page';

describe('ProduktkategorienPage', () => {
    let component: ProduktkategorienPage;
    let fixture: ComponentFixture<ProduktkategorienPage>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [IonicModule.forRoot(), ProduktkategorienPage]
        }).compileComponents();

        fixture = TestBed.createComponent(ProduktkategorienPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
