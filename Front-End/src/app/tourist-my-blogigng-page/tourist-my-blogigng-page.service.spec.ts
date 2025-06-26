import { TestBed } from '@angular/core/testing';

import { TouristMyBlogigngPageService } from './tourist-my-blogigng-page.service';

describe('TouristMyBlogigngPageService', () => {
  let service: TouristMyBlogigngPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TouristMyBlogigngPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
