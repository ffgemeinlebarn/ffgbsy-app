import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TischkategorienListPage } from './tischkategorien-list.page';

describe('TischkategorienListPage', () => {
    let component: TischkategorienListPage;
    let fixture: ComponentFixture<TischkategorienListPage>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [IonicModule.forRoot(), TischkategorienListPage]
        }).compileComponents();

        fixture = TestBed.createComponent(TischkategorienListPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
