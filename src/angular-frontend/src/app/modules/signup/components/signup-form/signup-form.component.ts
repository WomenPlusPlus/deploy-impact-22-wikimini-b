import { Component, OnInit } from '@angular/core';
import { UsersServices } from 'src/services/users.services';
import { SignupSharedService } from '../../signup-shared.service';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css'],
})
export class SignupFormComponent implements OnInit {
  authToken: string = '';

  constructor(
    public signupShared: SignupSharedService,
    public usersServices: UsersServices
  ) {}

  ngOnInit(): void {
    // this.teacherSignUp(
    //   'alikarakirandom',
    //   'alikarakirandom@gmail.com',
    //   'alikarakirandom@gmail.com'
    // );
  }

  teacherSignUp(username: string, password: string, email: string) {
    this.usersServices
      .teacherSignUp(username, password, email)
      .subscribe((res) => {
        this.authToken = res;
        console.log(res);
      });
  }
}
