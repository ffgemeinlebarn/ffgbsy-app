import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AufnehmerDetailPage } from './aufnehmer-detail.page';

describe('AufnehmerDetailPage', () => {
  let component: AufnehmerDetailPage;
  let fixture: ComponentFixture<AufnehmerDetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AufnehmerDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
