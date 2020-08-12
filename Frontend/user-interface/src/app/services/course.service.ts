import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Course } from '../models/course';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  baseUrl = 'http://localhost:3000';
  constructor(private httpClient: HttpClient) {}

  getById(id): Observable<any> {
    return this.httpClient
      .get(this.baseUrl + '/courses/' + id)
      .pipe(catchError(this.errorHandler));
  }

  getByPage(page) {
    // get page of items from api
    return this.httpClient
      .get(this.baseUrl + `/courses?page=${page}`)
      .pipe(catchError(this.errorHandler));
  }
  getAll() {
    return this.httpClient
      .get(this.baseUrl + '/courses/')
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
