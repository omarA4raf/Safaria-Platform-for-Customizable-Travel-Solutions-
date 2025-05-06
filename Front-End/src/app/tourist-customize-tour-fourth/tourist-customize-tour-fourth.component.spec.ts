import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TouristCustomizeTourFourthComponent } from './tourist-customize-tour-fourth.component';

describe('TouristCustomizeTourFourthComponent', () => {
  let component: TouristCustomizeTourFourthComponent;
  let fixture: ComponentFixture<TouristCustomizeTourFourthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TouristCustomizeTourFourthComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TouristCustomizeTourFourthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
