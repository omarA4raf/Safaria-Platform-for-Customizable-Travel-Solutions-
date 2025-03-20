import { TestBed } from '@angular/core/testing';

import { AdminDashboardTourguideRequestService } from './admin-dashboard-tourguide-request.service';

describe('AdminDashboardTourguideRequestService', () => {
  let service: AdminDashboardTourguideRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminDashboardTourguideRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
