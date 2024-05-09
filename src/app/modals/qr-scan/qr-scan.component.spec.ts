import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QrScanComponent } from './qr-scan.component';

describe('QrScanComponent', () => {
    let component: QrScanComponent;
    let fixture: ComponentFixture<QrScanComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
    imports: [IonicModule.forRoot(), QrScanComponent]
}).compileComponents();

        fixture = TestBed.createComponent(QrScanComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
