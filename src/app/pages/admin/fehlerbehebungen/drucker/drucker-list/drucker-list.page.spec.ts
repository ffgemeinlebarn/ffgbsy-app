import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DruckerListPage } from './drucker-list.page';

describe('DruckerListPage', () => {
  let component: DruckerListPage;
  let fixture: ComponentFixture<DruckerListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DruckerListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
