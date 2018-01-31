import { Component, OnInit } from '@angular/core';
import { BookService} from '../shared/services/book.service';
import { Book } from '../shared/models/Book';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  private books: Book[] = [];
  private errorMessage: string;
  private bookSubscription: Subscription;

  constructor(private bookService: BookService) { }

  ngOnInit() {
    this.bookService.getBooks(this.setBooks.bind(this), this.setError.bind(this));
  }

  setBooks(retrievedBooks){
      this.books = retrievedBooks;
  }

  setError(err){
    this.errorMessage = err;
  }

}
