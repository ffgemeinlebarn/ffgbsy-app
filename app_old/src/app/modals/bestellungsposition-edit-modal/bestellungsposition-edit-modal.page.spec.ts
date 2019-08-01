import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BestellungspositionEditModalPage } from './bestellungsposition-edit-modal.page';

describe('BestellungspositionEditModalPage', () => {
  let component: BestellungspositionEditModalPage;
  let fixture: ComponentFixture<BestellungspositionEditModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BestellungspositionEditModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BestellungspositionEditModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
