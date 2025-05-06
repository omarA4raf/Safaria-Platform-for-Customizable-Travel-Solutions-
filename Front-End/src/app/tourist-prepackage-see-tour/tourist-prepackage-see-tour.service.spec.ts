import { TestBed } from '@angular/core/testing';

import { TouristPrepackageSeeTourService } from './tourist-prepackage-see-tour.service';

describe('TouristPrepackageSeeTourService', () => {
  let service: TouristPrepackageSeeTourService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TouristPrepackageSeeTourService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
