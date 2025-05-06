import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TouristPrepackageSeeTourComponent } from './tourist-prepackage-see-tour.component';

describe('TouristPrepackageSeeTourComponent', () => {
  let component: TouristPrepackageSeeTourComponent;
  let fixture: ComponentFixture<TouristPrepackageSeeTourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TouristPrepackageSeeTourComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TouristPrepackageSeeTourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
