import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TouristDashboardHomeComponent } from './tourist-dashboard-home.component';

describe('TouristDashboardHomeComponent', () => {
  let component: TouristDashboardHomeComponent;
  let fixture: ComponentFixture<TouristDashboardHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TouristDashboardHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TouristDashboardHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
