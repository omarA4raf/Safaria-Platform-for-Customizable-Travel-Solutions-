import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashboardTourproviderComponent } from './admin-dashboard-tourprovider.component';

describe('AdminDashboardTourproviderComponent', () => {
  let component: AdminDashboardTourproviderComponent;
  let fixture: ComponentFixture<AdminDashboardTourproviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminDashboardTourproviderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDashboardTourproviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
