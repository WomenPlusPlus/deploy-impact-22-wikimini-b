import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassroomCreationNamingComponent } from './classroom-creation-naming.component';

describe('ClassroomCreationNamingComponent', () => {
  let component: ClassroomCreationNamingComponent;
  let fixture: ComponentFixture<ClassroomCreationNamingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassroomCreationNamingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassroomCreationNamingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
