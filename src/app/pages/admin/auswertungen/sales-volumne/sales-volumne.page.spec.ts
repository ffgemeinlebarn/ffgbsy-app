import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SalesVolumnePage } from './sales-volumne.page';

describe('SalesVolumnePage', () => {
  let component: SalesVolumnePage;
  let fixture: ComponentFixture<SalesVolumnePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesVolumnePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
