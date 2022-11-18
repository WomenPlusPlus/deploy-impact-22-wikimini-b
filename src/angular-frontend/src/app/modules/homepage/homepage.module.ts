import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './components/homepage/homepage.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import {RouterModule} from '@angular/router';
import { HomepageWelcomeComponent } from './components/homepage-welcome/homepage-welcome.component';



@NgModule({
  declarations: [
    HomepageComponent,
    NavbarComponent,
    HomepageWelcomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HomepageComponent
  ]
})
export class HomepageModule { }
