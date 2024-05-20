import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DataLoadedReportModalComponent } from './data-loaded-report-modal.component';

describe('DataLoadedReportComponent', () => {
    let component: DataLoadedReportModalComponent;
    let fixture: ComponentFixture<DataLoadedReportModalComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [DataLoadedReportModalComponent],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(DataLoadedReportModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
