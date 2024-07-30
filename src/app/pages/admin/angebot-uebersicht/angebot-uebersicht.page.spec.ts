import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngebotUebersichtPage } from './angebot-uebersicht.page';

describe('AngebotUebersichtPage', () => {
  let component: AngebotUebersichtPage;
  let fixture: ComponentFixture<AngebotUebersichtPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AngebotUebersichtPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
