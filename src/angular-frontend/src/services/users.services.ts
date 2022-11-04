import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UsersServices {
  constructor(private http: HttpClient) {}

  teacherLogin(username: string, password: string): Observable<any> {
    return this.http
      .post<{ sucess: boolean; res: any }>(
        `${environment.webApi}accounts/teacherLogin`,
        { username, password }
      )
      .pipe(map((res) => res.res));
  }

  teacherSignUp(
    username: string,
    password: string,
    email: string
  ): Observable<any> {
    return this.http
      .post<{ sucess: boolean; res: any }>(
        `${environment.webApi}accounts/teacherSignup`,
        { username, password, email }
      )
      .pipe(map((res) => res.res));
  }
}
