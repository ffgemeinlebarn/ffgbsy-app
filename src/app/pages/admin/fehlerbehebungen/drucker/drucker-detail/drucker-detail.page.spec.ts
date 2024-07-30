import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DruckerDetailPage } from './drucker-detail.page';

describe('DruckerDetailPage', () => {
  let component: DruckerDetailPage;
  let fixture: ComponentFixture<DruckerDetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DruckerDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
