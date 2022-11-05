import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './components/login-page/login-page.component'
import {RouterModule} from '@angular/router';



@NgModule({
  declarations: [
  
    LoginPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class LoginModule { }
