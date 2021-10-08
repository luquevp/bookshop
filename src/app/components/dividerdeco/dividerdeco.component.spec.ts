import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DividerdecoComponent } from './dividerdeco.component';

describe('DividerdecoComponent', () => {
  let component: DividerdecoComponent;
  let fixture: ComponentFixture<DividerdecoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DividerdecoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DividerdecoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
