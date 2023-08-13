import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadarControlComponent } from './radar-control.component';

describe('RadarControlComponent', () => {
  let component: RadarControlComponent;
  let fixture: ComponentFixture<RadarControlComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RadarControlComponent]
    });
    fixture = TestBed.createComponent(RadarControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
