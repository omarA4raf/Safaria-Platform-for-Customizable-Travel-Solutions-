import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashboardTourguideRequestComponent } from './admin-dashboard-tourguide-request.component';

describe('AdminDashboardTourguideRequestComponent', () => {
  let component: AdminDashboardTourguideRequestComponent;
  let fixture: ComponentFixture<AdminDashboardTourguideRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminDashboardTourguideRequestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDashboardTourguideRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
