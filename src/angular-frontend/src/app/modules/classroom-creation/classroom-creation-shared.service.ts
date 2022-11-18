import { Injectable } from '@angular/core';
import { ClassroomCreationStatus } from './ClassroomCreationStatusEnum';

@Injectable({
  providedIn: 'root'
})
export class ClassroomCreationSharedService {

  public ClassroomCreationStatusEnum = ClassroomCreationStatus;
  public ClassroomCreationStatus = ClassroomCreationStatus.CLASSROOM_CREATION_NAMING;


  constructor() { }

  getPreviousStatus(){
    switch(this.ClassroomCreationStatus){
      case ClassroomCreationStatus.CLASSROOM_CREATION_NAMING: {
        // Close and navigate to home
        break;
      }
      case ClassroomCreationStatus.CLASSROOM_CREATION_ADD: {
        // Should check if code is valid but not add the student to classroom yet in case user goes back a step after input
        this.ClassroomCreationStatus = ClassroomCreationStatus.CLASSROOM_CREATION_NAMING;
        break;
      }
      case ClassroomCreationStatus.CLASSROOM_CREATION_INVITE: {
        this.ClassroomCreationStatus = ClassroomCreationStatus.CLASSROOM_CREATION_ADD;
        break;
      }
      case ClassroomCreationStatus.CLASSROOM_CREATION_SUCCESS: {
        this.ClassroomCreationStatus = ClassroomCreationStatus.CLASSROOM_CREATION_INVITE;
        break;
      }
    }
  }

  getNextStatus(){
    switch(this.ClassroomCreationStatus){
      case ClassroomCreationStatus.CLASSROOM_CREATION_NAMING: {
        this.ClassroomCreationStatus = ClassroomCreationStatus.CLASSROOM_CREATION_ADD;
        break;
      }
      case ClassroomCreationStatus.CLASSROOM_CREATION_ADD: {
        // Should check if code is valid but not add the student to classroom yet in case user goes back a step after input
        this.ClassroomCreationStatus = ClassroomCreationStatus.CLASSROOM_CREATION_INVITE;
        break;
      }
      case ClassroomCreationStatus.CLASSROOM_CREATION_INVITE: {
        this.ClassroomCreationStatus = ClassroomCreationStatus.CLASSROOM_CREATION_SUCCESS;
        break;
      }
    }
  }
}
