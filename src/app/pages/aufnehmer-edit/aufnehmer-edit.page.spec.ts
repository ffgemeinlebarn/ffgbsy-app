import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AufnehmerEditPage } from './aufnehmer-edit.page';

describe('AufnehmerEditPage', () => {
    let component: AufnehmerEditPage;
    let fixture: ComponentFixture<AufnehmerEditPage>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [AufnehmerEditPage],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(AufnehmerEditPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
