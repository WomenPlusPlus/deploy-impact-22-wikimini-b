import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassroomCreationAddStudentsComponent } from './classroom-creation-add-students.component';

describe('ClassroomCreationAddStudentsComponent', () => {
  let component: ClassroomCreationAddStudentsComponent;
  let fixture: ComponentFixture<ClassroomCreationAddStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassroomCreationAddStudentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassroomCreationAddStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
