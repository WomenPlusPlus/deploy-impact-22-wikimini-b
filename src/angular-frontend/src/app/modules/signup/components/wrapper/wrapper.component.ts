import { Component, OnInit } from '@angular/core';
import { UsersServices } from 'src/services/users.services';
import { SignupSharedService } from '../../signup-shared.service';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.css', '../../shared/signup-styles.css'],
})
export class WrapperComponent implements OnInit {
  constructor(
    public signupShared: SignupSharedService,
    public usersServices: UsersServices
  ) {}

  ngOnInit(): void {}
}
