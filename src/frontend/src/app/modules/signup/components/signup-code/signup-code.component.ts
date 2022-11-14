import { Component, OnInit } from '@angular/core';
import { SignupSharedService } from '../../signup-shared.service';

@Component({
  selector: 'app-signup-code',
  templateUrl: './signup-code.component.html',
  styleUrls: ['./signup-code.component.css']
})
export class SignupCodeComponent implements OnInit {

  constructor(
    public signupShared: SignupSharedService
  ) { }

  ngOnInit(): void {
  }

}
