import { TestBed } from '@angular/core/testing';

import { ClassroomCreationSharedService } from './classroom-creation-shared.service';

describe('ClassroomCreationSharedService', () => {
  let service: ClassroomCreationSharedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClassroomCreationSharedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
