import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NeueBestellungPage } from './neue-bestellung.page';

describe('NeueBestellungPage', () => {
  let component: NeueBestellungPage;
  let fixture: ComponentFixture<NeueBestellungPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NeueBestellungPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NeueBestellungPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
