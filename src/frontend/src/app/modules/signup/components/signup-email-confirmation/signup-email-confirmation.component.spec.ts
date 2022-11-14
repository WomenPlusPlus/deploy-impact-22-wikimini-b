import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupEmailConfirmationComponent } from './signup-email-confirmation.component';

describe('SignupEmailConfirmationComponent', () => {
  let component: SignupEmailConfirmationComponent;
  let fixture: ComponentFixture<SignupEmailConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupEmailConfirmationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupEmailConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
