import { Injectable } from '@angular/core';
import { SignupStatus } from './SignupStatusEnum'

@Injectable({
  providedIn: 'root'
})
export class SignupSharedService {

  public SignupStatusEnum = SignupStatus;
  public signupStatus = SignupStatus.SIGNUP_CHOICE;

  constructor() {
  }

  setSignupStatus(status: any){
    this.signupStatus = status;
  }

  getPreviousStatus(){
    switch(this.signupStatus){
      case SignupStatus.SIGNUP_CHOICE: {
        // Close and navigate to home
        break;
      }
      case SignupStatus.SIGNUP_CODE_STUDENT: {
        // Should check if code is valid but not add the student to classroom yet in case user goes back a step after input
        this.signupStatus = SignupStatus.SIGNUP_CHOICE;
        break;
      }
      case SignupStatus.SIGNUP_FORM_STUDENT: {
        this.signupStatus = SignupStatus.SIGNUP_CODE_STUDENT;
        break;
      }
      case SignupStatus.SIGNUP_FORM_TEACHER: {
        this.signupStatus = SignupStatus.SIGNUP_CHOICE;
        break;
      }
      case SignupStatus.SIGNUP_EMAIL_CONFIRMATION: {
        // Shouldn't be able to go back
        break;
      }
      case SignupStatus.SIGNUP_SUCCESS_STUDENT: {
        // Shouldn't be able to go back
        break;
      }
      case SignupStatus.SIGNUP_SUCCESS_TEACHER: {
        // Shouldn't be able to go back
        break;
      }
    }
  }

  getNextStatus(){
    switch(this.signupStatus){
      case SignupStatus.SIGNUP_CHOICE: {
        // Button Click
        break;
      }
      case SignupStatus.SIGNUP_CODE_STUDENT: {
        // Should check if code is valid but not add the student to classroom yet in case user goes back a step after input
        this.signupStatus = SignupStatus.SIGNUP_FORM_STUDENT;
        break;
      }
      case SignupStatus.SIGNUP_FORM_STUDENT: {
        this.signupStatus = SignupStatus.SIGNUP_SUCCESS_STUDENT;
        break;
      }
      case SignupStatus.SIGNUP_FORM_TEACHER: {
        console.log('signup form teacher')
        this.signupStatus = SignupStatus.SIGNUP_EMAIL_CONFIRMATION;
        break;
      }
      case SignupStatus.SIGNUP_EMAIL_CONFIRMATION: {
        // Shouldn't be able to go forward
        break;
      }
      case SignupStatus.SIGNUP_SUCCESS_STUDENT: {
        // Shouldn't be able to go forward
        break;
      }
      case SignupStatus.SIGNUP_SUCCESS_TEACHER: {
        // Shouldn't be able to go forward
        break;
      }
    }
  }

  resetStatus() {
    this.signupStatus = SignupStatus.SIGNUP_CHOICE;
  }
}
