import { Injectable } from '@angular/core';
import { ClassroomCreationStatus } from './ClassroomCreationStatusEnum';

@Injectable({
  providedIn: 'root'
})
export class ClassroomCreationSharedService {

  public ClassroomCreationStatusEnum = ClassroomCreationStatus;
  public ClassroomCreationStatus = ClassroomCreationStatus.CLASSROOM_CREATION_NAMING;


  constructor() { }

}
