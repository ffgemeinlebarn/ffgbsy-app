import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GrundproduktePage } from './grundprodukte.page';

describe('GrundproduktePage', () => {
  let component: GrundproduktePage;
  let fixture: ComponentFixture<GrundproduktePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [IonicModule.forRoot(), GrundproduktePage]
}).compileComponents();

    fixture = TestBed.createComponent(GrundproduktePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
