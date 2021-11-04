import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotpasscodigoComponent } from './forgotpasscodigo.component';

describe('ForgotpasscodigoComponent', () => {
  let component: ForgotpasscodigoComponent;
  let fixture: ComponentFixture<ForgotpasscodigoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgotpasscodigoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotpasscodigoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
