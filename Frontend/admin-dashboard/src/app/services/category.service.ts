import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Category } from '../models/category';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  baseUrl = 'http://localhost:3000';
  constructor(private httpClient: HttpClient) {}

  create(category: Category) {
    delete category._id;
    return this.httpClient
      .post(this.baseUrl + '/categories/', category, {
        observe: 'body',
      })
      .pipe(catchError(this.errorHandler));
  }
  getById(id): Observable<any> {
    return this.httpClient
      .get(this.baseUrl + '/categories/' + id)
      .pipe(catchError(this.errorHandler));
  }

  getAll(): Observable<any> {
    return this.httpClient
      .get(this.baseUrl + '/categories/')
      .pipe(catchError(this.errorHandler));
  }

  update(id, category) {
    return this.httpClient
      .patch(this.baseUrl + '/categories/' + id, JSON.stringify(category))
      .pipe(catchError(this.errorHandler));
  }

  delete(id) {
    return this.httpClient
      .delete(this.baseUrl + '/categories/' + id)
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
