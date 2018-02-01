import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Book } from '../models/Book';
import { StatusState } from '../models/StatusState';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class BookService {

  private prefix = "http://localhost:9000";
  private statusSubject = new BehaviorSubject<StatusState>(new StatusState());

  constructor(private http: HttpClient) { 
  }

  getBooks(successCallback, failCallback): Promise<void>{
    return this.http.get(`${this.prefix}/api/books`)
      .toPromise()
      .then((books) => {
        this.resetAtHome();
        successCallback(books);
      })
      .catch((err) => {
        this.statusSubject.next(<StatusState>{display: "error", message: "Failed to load books from database!", resetHome: true});
        failCallback(err);
      });
  }

  createBook(book: Book, successCallback, failCallback): Promise<void>{
    return this.http.post(`${this.prefix}/api/books`, book)
      .toPromise()
      .then(() => {
        this.statusSubject.next(<StatusState>{display: "success", message: "Book successfully created!", resetHome: false});
        successCallback();
      })
      .catch(() => {
        this.statusSubject.next(<StatusState>{display: "error", message: "Failed to create book! Try a different ID #, and check that all fields are valid.", resetHome: true});
        failCallback();
      });
  }

  getBook(id: number, successCallback, failCallback): Promise<void>{
    return this.http.get(`${this.prefix}/api/books/${id}`)
      .toPromise()
      .then((book) => {
        this.resetAtHome();
        successCallback(book);
      })
      .catch(() => {
        this.statusSubject.next(<StatusState>{display: "error", message: `Failed to load book with ID #${id}!`, resetHome: false});
        failCallback();
      });
  }

  deleteBook(id: number, successCallback, failCallback): Promise<void>{
    return this.http.delete(`${this.prefix}/api/books/${id}`)
      .toPromise()
      .then(() => {
        this.statusSubject.next(<StatusState>{display: "success", message: `Successfully deleted book!`, resetHome: false});
        successCallback();
      })
      .catch(() => {
        this.statusSubject.next(<StatusState>{display: "error", message: `Failed to delete book with ID #${id}!`, resetHome: true});
        failCallback();
      });
  }

  editBook(book: Book, successCallback, failCallback): Promise<void>{
    return this.http.put(`${this.prefix}/api/books/${book.id}`, book)
      .toPromise()
      .then(() => {
        this.statusSubject.next(<StatusState>{display: "success", message: "Changes saved!", resetHome: false});
        successCallback();
      })
      .catch(() => {
        this.statusSubject.next(<StatusState>{display: "error", message: "Failed to save changes to this book! Check that all fields are valid.", resetHome: true});
        failCallback();
      });
  }

  getStatus(): Observable<StatusState>{
    return this.statusSubject.asObservable();
  }

  closeStatus(){
    this.statusSubject.next(<StatusState>{display: "none"});
  }

  resetAtHome(){
    if(this.statusSubject.value.resetHome){
      this.closeStatus();
    }
    else{
      let oldStatusSubject = this.statusSubject.value;
      this.statusSubject.next(<StatusState>{display: oldStatusSubject.display,
        message: oldStatusSubject.message, resetHome: true});
    }
  }

}
