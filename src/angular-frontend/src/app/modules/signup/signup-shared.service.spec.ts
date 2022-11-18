import { TestBed } from '@angular/core/testing';

import { SignupSharedService } from './signup-shared.service';

describe('SignupSharedService', () => {
  let service: SignupSharedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignupSharedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
