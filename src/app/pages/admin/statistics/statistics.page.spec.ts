import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StatisticsPage } from './statistics.page';

describe('StatisticsPage', () => {
    let component: StatisticsPage;
    let fixture: ComponentFixture<StatisticsPage>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
    imports: [IonicModule.forRoot(), StatisticsPage]
}).compileComponents();

        fixture = TestBed.createComponent(StatisticsPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
