import { Component, OnInit } from '@angular/core';
import { SignupSharedService } from '../../signup-shared.service';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.css']
})
export class WrapperComponent implements OnInit {

  constructor(
    public signupShared: SignupSharedService
  ) {
  }

  ngOnInit(): void {
  }

}
