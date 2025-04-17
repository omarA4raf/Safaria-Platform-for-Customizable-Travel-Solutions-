import { TestBed } from '@angular/core/testing';

import { TourguideCreateTripService } from './tourguide-create-trip.service';

describe('TourguideCreateTripService', () => {
  let service: TourguideCreateTripService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TourguideCreateTripService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
