import { TestBed } from '@angular/core/testing';

import { TouristDashboardHomeService } from './tourist-dashboard-home.service';

describe('TouristDashboardHomeService', () => {
  let service: TouristDashboardHomeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TouristDashboardHomeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
