import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BestellungKontrollePage } from './bestellung-kontrolle.page';

describe('BestellungKontrollePage', () => {
  let component: BestellungKontrollePage;
  let fixture: ComponentFixture<BestellungKontrollePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BestellungKontrollePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BestellungKontrollePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
