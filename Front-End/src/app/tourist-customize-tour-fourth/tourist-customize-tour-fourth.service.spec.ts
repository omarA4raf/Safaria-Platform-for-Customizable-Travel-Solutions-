import { TestBed } from '@angular/core/testing';

import { TouristCustomizeTourFourthService } from './tourist-customize-tour-fourth.service';

describe('TouristCustomizeTourFourthService', () => {
  let service: TouristCustomizeTourFourthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TouristCustomizeTourFourthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
