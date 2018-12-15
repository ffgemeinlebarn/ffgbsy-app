import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BestellungDetailPage } from './bestellung-detail.page';

describe('BestellungDetailPage', () => {
  let component: BestellungDetailPage;
  let fixture: ComponentFixture<BestellungDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BestellungDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BestellungDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
