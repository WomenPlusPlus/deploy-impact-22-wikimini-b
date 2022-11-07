import { Component, OnInit } from '@angular/core';
import { SignupSharedService } from '../../signup-shared.service';

@Component({
  selector: 'app-signup-email-confirmation',
  templateUrl: './signup-email-confirmation.component.html',
  styleUrls: ['./signup-email-confirmation.component.css']
})
export class SignupEmailConfirmationComponent implements OnInit {

  constructor(
    public signupShared: SignupSharedService
  ) { }

  ngOnInit(): void {
  }

}
