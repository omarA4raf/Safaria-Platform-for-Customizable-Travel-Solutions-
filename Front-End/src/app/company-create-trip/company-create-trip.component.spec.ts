import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyCreateTripComponent } from './company-create-trip.component';

describe('CompanyCreateTripComponent', () => {
  let component: CompanyCreateTripComponent;
  let fixture: ComponentFixture<CompanyCreateTripComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyCreateTripComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyCreateTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
