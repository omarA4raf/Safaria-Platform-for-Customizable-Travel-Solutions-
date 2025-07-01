import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TouristBlogigngPageComponent } from './tourist-blogigng-page.component';

describe('TouristBlogigngPageComponent', () => {
  let component: TouristBlogigngPageComponent;
  let fixture: ComponentFixture<TouristBlogigngPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TouristBlogigngPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TouristBlogigngPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
