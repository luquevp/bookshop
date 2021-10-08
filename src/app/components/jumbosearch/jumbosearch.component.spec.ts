import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { JumbosearchComponent } from './jumbosearch.component';

describe('JumbosearchComponent', () => {
  let component: JumbosearchComponent;
  let fixture: ComponentFixture<JumbosearchComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ JumbosearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JumbosearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
