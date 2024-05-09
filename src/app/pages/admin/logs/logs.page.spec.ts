import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LogsPage } from './logs.page';

describe('LogsPage', () => {
    let component: LogsPage;
    let fixture: ComponentFixture<LogsPage>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
    imports: [IonicModule.forRoot(), LogsPage]
}).compileComponents();

        fixture = TestBed.createComponent(LogsPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
