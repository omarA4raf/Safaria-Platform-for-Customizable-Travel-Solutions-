import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TouristViewTripComponent } from './tourist-view-trip.component';

describe('TouristViewTripComponent', () => {
  let component: TouristViewTripComponent;
  let fixture: ComponentFixture<TouristViewTripComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TouristViewTripComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TouristViewTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
