import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TouristCustomizeTourSecondComponent } from './tourist-customize-tour-second.component';

describe('TouristCustomizeTourSecondComponent', () => {
  let component: TouristCustomizeTourSecondComponent;
  let fixture: ComponentFixture<TouristCustomizeTourSecondComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TouristCustomizeTourSecondComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TouristCustomizeTourSecondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
