import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TouristPayTripComponent } from './tourist-pay-trip.component';

describe('TouristPayTripComponent', () => {
  let component: TouristPayTripComponent;
  let fixture: ComponentFixture<TouristPayTripComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TouristPayTripComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TouristPayTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
