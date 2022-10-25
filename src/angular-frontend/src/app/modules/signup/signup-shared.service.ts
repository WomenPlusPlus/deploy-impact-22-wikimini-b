import { Injectable } from '@angular/core';
import { SignupStatus } from './SignupStatusEnum'

@Injectable({
  providedIn: 'root'
})
export class SignupSharedService {

  public SignupStatusEnum = SignupStatus;
  public signupStatus = SignupStatus.SIGNUP_CHOICE;

  constructor() { }
}
