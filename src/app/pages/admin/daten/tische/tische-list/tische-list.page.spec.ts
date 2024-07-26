import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { TischeListPage } from './tische-list.page';

describe('TischeListPage', () => {
    let component: TischeListPage;
    let fixture: ComponentFixture<TischeListPage>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [IonicModule.forRoot(), TischeListPage]
        }).compileComponents();

        fixture = TestBed.createComponent(TischeListPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
