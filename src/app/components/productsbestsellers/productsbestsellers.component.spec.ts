import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsbestsellersComponent } from './productsbestsellers.component';

describe('ProductsbestsellersComponent', () => {
  let component: ProductsbestsellersComponent;
  let fixture: ComponentFixture<ProductsbestsellersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsbestsellersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsbestsellersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
