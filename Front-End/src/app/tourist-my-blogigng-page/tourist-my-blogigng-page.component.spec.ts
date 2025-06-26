import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TouristMyBlogigngPageComponent } from './tourist-my-blogigng-page.component';

describe('TouristMyBlogigngPageComponent', () => {
  let component: TouristMyBlogigngPageComponent;
  let fixture: ComponentFixture<TouristMyBlogigngPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TouristMyBlogigngPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TouristMyBlogigngPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
