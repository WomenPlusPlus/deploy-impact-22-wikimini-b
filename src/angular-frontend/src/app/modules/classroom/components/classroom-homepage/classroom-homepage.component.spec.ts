import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassroomHomepageComponent } from './classroom-homepage.component';

describe('ClassroomHomepageComponent', () => {
  let component: ClassroomHomepageComponent;
  let fixture: ComponentFixture<ClassroomHomepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassroomHomepageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassroomHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
