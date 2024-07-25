import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TischkategorienDetailPage } from './tischkategorien-detail.page';

describe('TischkategorienDetailPage', () => {
    let component: TischkategorienDetailPage;
    let fixture: ComponentFixture<TischkategorienDetailPage>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [IonicModule.forRoot(), TischkategorienDetailPage]
        }).compileComponents();

        fixture = TestBed.createComponent(TischkategorienDetailPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
