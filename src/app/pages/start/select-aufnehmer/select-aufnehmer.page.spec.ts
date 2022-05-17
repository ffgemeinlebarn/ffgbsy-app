import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectAufnehmerPage } from './select-aufnehmer.page';

describe('SelectAufnehmerPage', () => {
  let component: SelectAufnehmerPage;
  let fixture: ComponentFixture<SelectAufnehmerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectAufnehmerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectAufnehmerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
