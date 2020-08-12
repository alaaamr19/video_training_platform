import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  baseUrl = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) {}

  create(user: User) {
    delete user._id;
    return this.httpClient
      .post(this.baseUrl + '/users/admin', user, {
        observe: 'body',
      })
      .pipe(catchError(this.errorHandler));
  }

  getAllUsers(): Observable<any> {
    return this.httpClient
      .get(this.baseUrl + '/users/')
      .pipe(catchError(this.errorHandler));
  }

  disable(id) {
    console.log(id);
    return this.httpClient
      .delete(this.baseUrl + '/users/' + id)
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
