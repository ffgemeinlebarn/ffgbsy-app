import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProdukteListPage } from './produkte-list.page';

describe('ProduktePage', () => {
    let component: ProdukteListPage;
    let fixture: ComponentFixture<ProdukteListPage>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [IonicModule.forRoot(), ProdukteListPage]
        }).compileComponents();

        fixture = TestBed.createComponent(ProdukteListPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
