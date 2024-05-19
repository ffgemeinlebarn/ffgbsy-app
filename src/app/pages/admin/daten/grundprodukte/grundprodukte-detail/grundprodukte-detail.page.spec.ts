import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GrundprodukteDetailPage } from './grundprodukte-detail.page';

describe('GrundprodukteDetailPage', () => {
  let component: GrundprodukteDetailPage;
  let fixture: ComponentFixture<GrundprodukteDetailPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [IonicModule.forRoot(), GrundprodukteDetailPage]
}).compileComponents();

    fixture = TestBed.createComponent(GrundprodukteDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
