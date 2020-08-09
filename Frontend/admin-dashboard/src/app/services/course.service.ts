import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Course } from '../models/course';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  baseUrl = 'http://localhost:3000';
  constructor(private httpClient: HttpClient) {}
  create(course: Course) {
    return this.httpClient
      .post(this.baseUrl + '/courses/', JSON.stringify(course), {
        observe: 'body',
      })
      .pipe(catchError(this.errorHandler));
  }
  getById(id) {
    return this.httpClient
      .get(this.baseUrl + '/courses/' + id)
      .pipe(catchError(this.errorHandler));
  }

  getAll() {
    return this.httpClient
      .get(this.baseUrl + '/courses/')
      .pipe(catchError(this.errorHandler));
  }

  update(id, course) {
    return this.httpClient
      .put(this.baseUrl + '/courses/' + id, JSON.stringify(course))
      .pipe(catchError(this.errorHandler));
  }

  delete(id) {
    return this.httpClient
      .delete(this.baseUrl + '/courses/' + id)
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
