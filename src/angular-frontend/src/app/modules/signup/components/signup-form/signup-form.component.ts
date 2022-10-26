import { Component, OnInit } from '@angular/core';
import { SignupSharedService } from '../../signup-shared.service';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {

  constructor(
    public signupShared: SignupSharedService
  ) { }

  ngOnInit(): void {
  }

}
