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
  testCon(): Observable<any> {
    return this.http.get<any>(`${environment.webApi}`);
  }

  login():  Observable<any> {
    return this.http.get<any>(`${environment.webApi}`);
  }

  // teacherSignUp(username: string): Observable<any> {
  //   return this.http.post<any>(`${environment.webApi}user/signup`, { username });
  // }
}
