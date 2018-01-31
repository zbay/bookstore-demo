import { Component, OnInit } from '@angular/core';
import { BookService} from '../shared/services/book.service';
import { Book } from '../shared/models/Book';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  private books: Book[] = [];
  private errorMessage: string;

  constructor(private bookService: BookService) { }

  ngOnInit() {
    this.bookService.getBooks(this.setBooks.bind(this), this.setError.bind(this));
  }

  setBooks(retrievedBooks): void{
      this.books = retrievedBooks;
  }

  setError(err): void{
    this.errorMessage = err;
  }

}
