import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoidComponent } from './productoid.component';

describe('ProductoidComponent', () => {
  let component: ProductoidComponent;
  let fixture: ComponentFixture<ProductoidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductoidComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductoidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
