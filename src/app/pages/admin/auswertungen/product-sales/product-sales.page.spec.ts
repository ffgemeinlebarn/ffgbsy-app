import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductSalesPage } from './product-sales.page';

describe('ProductSalesPage', () => {
  let component: ProductSalesPage;
  let fixture: ComponentFixture<ProductSalesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSalesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
