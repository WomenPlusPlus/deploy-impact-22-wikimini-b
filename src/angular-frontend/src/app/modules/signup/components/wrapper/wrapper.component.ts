import { Component, OnInit } from '@angular/core';
import { UsersServices } from 'src/services/users.services';
import { SignupSharedService } from '../../signup-shared.service';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.css'],
})
export class WrapperComponent implements OnInit {
  constructor(public signupShared: SignupSharedService, public usersServices: UsersServices) {}

  ngOnInit(): void {
    this.testConnection();
  }

  testConnection(): void {
    
    this.usersServices.testCon().subscribe((res: any) => {
      console.log(res);      
    });
  }

}
