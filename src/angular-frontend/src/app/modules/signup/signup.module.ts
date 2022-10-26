import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WrapperComponent } from './components/wrapper/wrapper.component';
import { SignupChoiceComponent } from './components/signup-choice/signup-choice.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';
import { SignupSuccessComponent } from './components/signup-success/signup-success.component';
import { SignupEmailConfirmationComponent } from './components/signup-email-confirmation/signup-email-confirmation.component';
import { SignupPitchComponent } from './components/signup-pitch/signup-pitch.component';
import { SignupCodeComponent } from './components/signup-code/signup-code.component';



@NgModule({
  declarations: [
    WrapperComponent,
    SignupChoiceComponent,
    SignupFormComponent,
    SignupSuccessComponent,
    SignupEmailConfirmationComponent,
    SignupPitchComponent,
    SignupCodeComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    WrapperComponent,
    SignupChoiceComponent,
    SignupFormComponent,
    SignupSuccessComponent,
    SignupEmailConfirmationComponent,
    SignupPitchComponent
  ]
})
export class SignupModule { }
