import { Component, OnInit } from '@angular/core';
import { SignupSharedService } from '../../signup-shared.service';

@Component({
  selector: 'app-signup-choice',
  templateUrl: './signup-choice.component.html',
  styleUrls: ['./signup-choice.component.css']
})
export class SignupChoiceComponent implements OnInit {

  constructor(
    public signupShared: SignupSharedService
  ) { }

  ngOnInit(): void {
  }

}
