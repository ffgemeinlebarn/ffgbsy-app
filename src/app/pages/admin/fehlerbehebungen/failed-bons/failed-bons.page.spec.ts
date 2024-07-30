import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FailedBonsPage } from './failed-bons.page';

describe('FailedBonsPage', () => {
  let component: FailedBonsPage;
  let fixture: ComponentFixture<FailedBonsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FailedBonsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
