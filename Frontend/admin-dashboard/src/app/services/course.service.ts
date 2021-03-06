import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Course } from '../models/course';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  baseUrl = 'http://localhost:3000';
  constructor(private httpClient: HttpClient) {}
  create(course: Course) {
    return this.httpClient
      .post(this.baseUrl + '/courses/', course, {
        observe: 'body',
      })
      .pipe(catchError(this.errorHandler));
  }
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

  update(id, course) {
    return this.httpClient
      .put(this.baseUrl + '/courses/' + id, course)
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
      // Get clientside error
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    return throwError(errorMessage);
  }
}
