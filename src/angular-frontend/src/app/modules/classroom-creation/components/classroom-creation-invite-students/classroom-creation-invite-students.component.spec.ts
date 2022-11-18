import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassroomCreationInviteStudentsComponent } from './classroom-creation-invite-students.component';

describe('ClassroomCreationInviteStudentsComponent', () => {
  let component: ClassroomCreationInviteStudentsComponent;
  let fixture: ComponentFixture<ClassroomCreationInviteStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassroomCreationInviteStudentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassroomCreationInviteStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
