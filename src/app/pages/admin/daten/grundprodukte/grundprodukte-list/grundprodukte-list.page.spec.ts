import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GrundprodukteListPage } from './grundprodukte-list.page';

describe('GrundprodukteListPage', () => {
    let component: GrundprodukteListPage;
    let fixture: ComponentFixture<GrundprodukteListPage>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [IonicModule.forRoot(), GrundprodukteListPage]
        }).compileComponents();

        fixture = TestBed.createComponent(GrundprodukteListPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
