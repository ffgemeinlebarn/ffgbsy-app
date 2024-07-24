import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AufnehmerListPage } from './aufnehmer-list.page';

describe('AufnehmerListPage', () => {
  let component: AufnehmerListPage;
  let fixture: ComponentFixture<AufnehmerListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AufnehmerListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
