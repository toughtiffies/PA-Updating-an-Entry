import { Injectable } from '@angular/core';
import { Book } from './Book';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
 
@Injectable({
  providedIn: 'root'
})
 
export class CrudService {

  // Node/Express API URL
  REST_API: string = 'http://localhost:8000/api';

  // Http Header for the request
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) { }

  // Get all books
  GetBooks(): Observable<Book[]> {
    return this.httpClient.get<Book[]>(`${this.REST_API}/books`, { headers: this.httpHeaders });
  }

  // Add a new book
  AddBook(data: Book): Observable<any> {
    let API_URL = `${this.REST_API}/add-book`;
    return this.httpClient.post(API_URL, data, { headers: this.httpHeaders })
      .pipe(
        catchError(this.handleError)
      );
  }

  // Get a book by ISBN
  getBookByIsbn(isbn: string): Observable<Book> {
    let API_URL = `${this.REST_API}/books/${isbn}`;  // Assuming your API endpoint is structured this way
    return this.httpClient.get<Book>(API_URL, { headers: this.httpHeaders })
      .pipe(
        catchError(this.handleError)
      );
  }

  // Update a book by ISBN
  UpdateBook(isbn: string, data: Book): Observable<any> {
    let API_URL = `${this.REST_API}/update-book/${isbn}`;  // Modify URL to use ISBN
    return this.httpClient.put(API_URL, data, { headers: this.httpHeaders })
      .pipe(
        catchError(this.handleError)
      );
  }

  // Error handling
  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = error.error.message;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
