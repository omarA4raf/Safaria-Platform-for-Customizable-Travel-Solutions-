import { TestBed } from '@angular/core/testing';

import { TouristCustomizeTourFirsService } from './tourist-customize-tour-firs.service';

describe('TouristCustomizeTourFirsService', () => {
  let service: TouristCustomizeTourFirsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TouristCustomizeTourFirsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
