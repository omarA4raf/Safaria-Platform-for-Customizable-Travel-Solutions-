import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TourguideCreateTripComponent } from './tourguide-create-trip.component';

describe('TourguideCreateTripComponent', () => {
  let component: TourguideCreateTripComponent;
  let fixture: ComponentFixture<TourguideCreateTripComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TourguideCreateTripComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TourguideCreateTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
