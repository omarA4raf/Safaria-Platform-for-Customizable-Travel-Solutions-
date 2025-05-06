import { TestBed } from '@angular/core/testing';

import { TouristPrepackagePayTourService } from './tourist-prepackage-pay-tour.service';

describe('TouristPrepackagePayTourService', () => {
  let service: TouristPrepackagePayTourService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TouristPrepackagePayTourService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
