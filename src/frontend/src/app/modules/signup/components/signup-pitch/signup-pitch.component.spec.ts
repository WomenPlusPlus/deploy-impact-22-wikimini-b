import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupPitchComponent } from './signup-pitch.component';

describe('SignupPitchComponent', () => {
  let component: SignupPitchComponent;
  let fixture: ComponentFixture<SignupPitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupPitchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupPitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
