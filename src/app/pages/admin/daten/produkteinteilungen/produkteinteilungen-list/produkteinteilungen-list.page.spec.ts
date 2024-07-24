import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProdukteinteilungenListPage } from './produkteinteilungen-list.page';

describe('ProdukteinteilungenListPage', () => {
    let component: ProdukteinteilungenListPage;
    let fixture: ComponentFixture<ProdukteinteilungenListPage>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [IonicModule.forRoot(), ProdukteinteilungenListPage]
        }).compileComponents();

        fixture = TestBed.createComponent(ProdukteinteilungenListPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
