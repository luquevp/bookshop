import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CartdetalleComponent } from './cartdetalle.component';

describe('CartdetalleComponent', () => {
  let component: CartdetalleComponent;
  let fixture: ComponentFixture<CartdetalleComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CartdetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartdetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
