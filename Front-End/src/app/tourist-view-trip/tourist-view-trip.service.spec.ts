import { TestBed } from '@angular/core/testing';

import { TouristViewTripService } from './tourist-view-trip.service';

describe('TouristViewTripService', () => {
  let service: TouristViewTripService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TouristViewTripService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
