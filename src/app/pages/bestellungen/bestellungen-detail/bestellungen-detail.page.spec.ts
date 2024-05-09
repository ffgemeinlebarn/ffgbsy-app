import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BestellungenDetailPage } from './bestellungen-detail.page';

describe('BestellungenDetailPage', () => {
  let component: BestellungenDetailPage;
  let fixture: ComponentFixture<BestellungenDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    imports: [BestellungenDetailPage],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BestellungenDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
