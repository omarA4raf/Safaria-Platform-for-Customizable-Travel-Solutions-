import { TestBed } from '@angular/core/testing';

import { AdminDashboardTourproviderService } from './admin-dashboard-tourprovider.service';

describe('AdminDashboardTourproviderService', () => {
  let service: AdminDashboardTourproviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminDashboardTourproviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
