import { TestBed } from '@angular/core/testing';

import { TouristPayTripService } from './tourist-pay-trip.service';

describe('TouristPayTripService', () => {
  let service: TouristPayTripService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TouristPayTripService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
