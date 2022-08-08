import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FrontendLoadingComponent } from './frontend-loading.component';

describe('FrontendLoadingComponent', () => {
    let component: FrontendLoadingComponent;
    let fixture: ComponentFixture<FrontendLoadingComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [FrontendLoadingComponent],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(FrontendLoadingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
