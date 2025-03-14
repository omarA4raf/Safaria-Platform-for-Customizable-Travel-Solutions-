import { TestBed } from '@angular/core/testing';

import { TourguideDashboardService } from './tourguide-dashboard.service';

describe('TourguideDashboardService', () => {
  let service: TourguideDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TourguideDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
