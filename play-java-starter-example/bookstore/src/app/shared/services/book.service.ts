import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Book } from '../models/Book';

@Injectable()
export class BookService {

  private prefix = "http://localhost:9000";

  constructor(private http: HttpClient) { }

  //getBooks(): Observable<Book[]>{
  getBooks(): Observable<any>{
    return this.http.get(`${this.prefix}/api/books`);
  }

  createBook(book: Book): Observable<any>{
    return this.http.post(`${this.prefix}/api/books/create`, book);
  }

  getBook(id: number): Observable<any>{
    return this.http.get(`${this.prefix}/api/books/${id}`);
  }

  deleteBook(id: number): Observable<any>{
    return this.http.delete(`${this.prefix}/api/books/${id}`);
  }

  editBook(book: Book): Observable<any>{
    return this.http.put(`${this.prefix}/api/books/${book.id}`, book);
  }

  /*getBooks(successCallback, failCallback){
    return this.http.get("/api/books")
    .map(response => response.json())
    .toPromise()
    .then((user) => {
      successCallback(user);
    })
    .catch((err) => {
      failCallback(err);
    });
  }*/

}
