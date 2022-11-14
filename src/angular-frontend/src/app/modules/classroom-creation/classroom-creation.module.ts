import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WrapperComponent } from './components/wrapper/wrapper.component';
import { ClassroomCreationNamingComponent } from './components/classroom-creation-naming/classroom-creation-naming.component';
import { ClassroomCreationAddStudentsComponent } from './components/classroom-creation-add-students/classroom-creation-add-students.component';



@NgModule({
  declarations: [
    WrapperComponent,
    ClassroomCreationNamingComponent,
    ClassroomCreationAddStudentsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ClassroomCreationModule { }
