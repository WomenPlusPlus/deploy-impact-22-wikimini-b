import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../environments/environment';
import { map } from 'rxjs/operators';
import { ClassroomCodes } from './Classroom.model';

@Injectable({
  providedIn: 'root',
})
export class ClassroomsServices {
  constructor(private http: HttpClient) {}
  getClassroomById(classroomId: string) {
    return this.http
      .post<{ sucess: boolean; classroomCodes: ClassroomCodes[] }>(
        `${environment.webApi}classrooms/getClassroomById`,
        { classroomId }
      )
      .pipe(map((res) => res.classroomCodes));
  }
}
