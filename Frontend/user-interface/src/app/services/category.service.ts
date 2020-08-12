import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  baseUrl = 'http://localhost:3000';
  constructor(private httpClient: HttpClient) {}

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

  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    return throwError(errorMessage);
  }
}
