import { Component, OnInit, OnDestroy } from '@angular/core';
import { BookService} from '../shared/services/book.service';
import { Book } from '../shared/models/Book';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit, OnDestroy {

  private books: Book[] = [];
  private errorMessage: string;
  private bookSubscription: Subscription;

  constructor(private bookService: BookService) { }

  ngOnInit() {
    let componentScope = this;
    this.bookSubscription = this.bookService.getBooks()
      .subscribe(function setBooks(retrievedBooks){
        componentScope.books = retrievedBooks;
      }, 
      function setError(msg){
        this.errorMessage = msg;
      });
  }

  ngOnDestroy(){
    this.bookSubscription.unsubscribe();
  }

}
