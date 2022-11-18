import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassroomCreationInviteSuccessComponent } from './classroom-creation-invite-success.component';

describe('ClassroomCreationInviteSuccessComponent', () => {
  let component: ClassroomCreationInviteSuccessComponent;
  let fixture: ComponentFixture<ClassroomCreationInviteSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassroomCreationInviteSuccessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassroomCreationInviteSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
