import { Component, OnInit } from '@angular/core';
import { UsersServices } from 'src/services/users.services';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  authToken: string = '';
  constructor(public usersServices: UsersServices) {}

  ngOnInit(): void {}

  teacherLogin(username: string, password: string) {
    this.usersServices.teacherLogin(username, password).subscribe((res) => {
      this.authToken = res;
      console.log(res);
    });
  }
}
