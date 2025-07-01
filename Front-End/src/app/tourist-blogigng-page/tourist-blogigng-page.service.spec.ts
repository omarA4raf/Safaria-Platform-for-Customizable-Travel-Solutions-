import { TestBed } from '@angular/core/testing';

import { TouristBlogigngPageService } from './tourist-blogigng-page.service';

describe('TouristBlogigngPageService', () => {
  let service: TouristBlogigngPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TouristBlogigngPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
