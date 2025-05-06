import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TouristPrepackagePayTourComponent } from './tourist-prepackage-pay-tour.component';

describe('TouristPrepackagePayTourComponent', () => {
  let component: TouristPrepackagePayTourComponent;
  let fixture: ComponentFixture<TouristPrepackagePayTourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TouristPrepackagePayTourComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TouristPrepackagePayTourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
