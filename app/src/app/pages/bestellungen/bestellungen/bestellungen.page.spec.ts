import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BestellungenPage } from './bestellungen.page';

describe('BestellungenPage', () => {
  let component: BestellungenPage;
  let fixture: ComponentFixture<BestellungenPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BestellungenPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BestellungenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
