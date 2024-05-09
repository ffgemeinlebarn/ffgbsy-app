import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProduktePage } from './produkte.page';

describe('ProduktePage', () => {
  let component: ProduktePage;
  let fixture: ComponentFixture<ProduktePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [IonicModule.forRoot(), ProduktePage]
}).compileComponents();

    fixture = TestBed.createComponent(ProduktePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
