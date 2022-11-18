import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UsersServices } from 'src/services/users.services';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {

  authToken: string = '';
  userForm: FormGroup;

  constructor(public usersServices: UsersServices) {
    this.userForm = new FormGroup({
      username: new FormControl(),
      password: new FormControl()
 }); 
  }

  ngOnInit(): void {}

  teacherLogin() {
    console.log(this.userForm.get('username')?.value + " " + this.userForm.get('password')?.value);
    this.usersServices.teacherlogin(this.userForm.get('username')?.value, this.userForm.get('password')?.value).subscribe((res) => {
      this.authToken = res;
      console.log(res);
    });
  }
}
