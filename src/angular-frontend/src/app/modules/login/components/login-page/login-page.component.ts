import { Component, OnInit } from '@angular/core';
import { UsersServices } from 'src/services/users.services';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  constructor(
    public uServ: UsersServices
  ) { }

  ngOnInit(): void {
  }

  logIn(){
    this.uServ.login();
  }

}
