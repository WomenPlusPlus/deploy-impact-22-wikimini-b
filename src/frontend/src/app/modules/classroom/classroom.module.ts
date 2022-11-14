import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassroomHomepageComponent } from './components/classroom-homepage/classroom-homepage.component';
import { ClassroomNavbarComponent } from './components/classroom-navbar/classroom-navbar.component';
import { MaterialModule } from '../material/material/material.module';



@NgModule({
  declarations: [
    ClassroomHomepageComponent,
    ClassroomNavbarComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class ClassroomModule { }
