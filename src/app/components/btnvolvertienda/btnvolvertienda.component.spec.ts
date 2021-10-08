import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BtnvolvertiendaComponent } from './btnvolvertienda.component';

describe('BtnvolvertiendaComponent', () => {
  let component: BtnvolvertiendaComponent;
  let fixture: ComponentFixture<BtnvolvertiendaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BtnvolvertiendaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnvolvertiendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
