import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PruebanicoComponent } from './pruebanico.component';

describe('PruebanicoComponent', () => {
  let component: PruebanicoComponent;
  let fixture: ComponentFixture<PruebanicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PruebanicoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PruebanicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
