import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassroomHomepageComponent } from './components/classroom-homepage/classroom-homepage.component';
import { ClassroomNavbarComponent } from './components/classroom-navbar/classroom-navbar.component';



@NgModule({
  declarations: [
    ClassroomHomepageComponent,
    ClassroomNavbarComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ClassroomModule { }
