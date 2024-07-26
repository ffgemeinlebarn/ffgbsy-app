import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TischeDetailPage } from './tische-detail.page';

describe('TischeDetailPage', () => {
    let component: TischeDetailPage;
    let fixture: ComponentFixture<TischeDetailPage>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [IonicModule.forRoot(), TischeDetailPage]
        }).compileComponents();

        fixture = TestBed.createComponent(TischeDetailPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
