import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WrapperComponent } from './components/wrapper/wrapper.component';
import { ClassroomCreationNamingComponent } from './components/classroom-creation-naming/classroom-creation-naming.component';
import { ClassroomCreationAddStudentsComponent } from './components/classroom-creation-add-students/classroom-creation-add-students.component';
import { ClassroomCreationInviteStudentsComponent } from './components/classroom-creation-invite-students/classroom-creation-invite-students.component';
import { ClassroomCreationInviteSuccessComponent } from './components/classroom-creation-invite-success/classroom-creation-invite-success.component';



@NgModule({
  declarations: [
    WrapperComponent,
    ClassroomCreationNamingComponent,
    ClassroomCreationAddStudentsComponent,
    ClassroomCreationInviteStudentsComponent,
    ClassroomCreationInviteSuccessComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ClassroomCreationModule { }
