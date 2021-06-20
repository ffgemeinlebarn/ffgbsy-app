import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemstatusPage } from './systemstatus.page';

describe('SystemstatusPage', () => {
  let component: SystemstatusPage;
  let fixture: ComponentFixture<SystemstatusPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemstatusPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemstatusPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
