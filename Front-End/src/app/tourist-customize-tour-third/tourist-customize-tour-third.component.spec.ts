import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TouristCustomizeTourThirdComponent } from './tourist-customize-tour-third.component';

describe('TouristCustomizeTourThirdComponent', () => {
  let component: TouristCustomizeTourThirdComponent;
  let fixture: ComponentFixture<TouristCustomizeTourThirdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TouristCustomizeTourThirdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TouristCustomizeTourThirdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
