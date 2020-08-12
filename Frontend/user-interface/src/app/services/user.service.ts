import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = 'http://localhost:3000/users';

  constructor(private httpClient: HttpClient) {}

  getUser() {
    const userData = localStorage.getItem('user');
    console.log(JSON.parse(userData));

    return JSON.parse(userData)?.user;
  }

  registerInCourse(course): Observable<any> {
    return this.httpClient
      .patch(this.baseUrl + '/course', { courses: course._id })
      .pipe(catchError(this.errorHandler));
  }

  finishCourse(course): Observable<any> {
    return this.httpClient
      .patch(this.baseUrl + '/finishCourse', { finishedCourses: course })
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client side error
      errorMessage = error.error.message;
    } else {
      // Get server side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

  getUserData(): Observable<any> {
    return this.httpClient
      .get(this.baseUrl + '/me')
      .pipe(catchError(this.errorHandler));
  }
}
