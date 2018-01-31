import { Component, OnInit, Input } from '@angular/core';
import { BookService } from '../shared/services/book.service';
import { Router } from '@angular/router';
import { Book } from '../shared/models/Book';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {
  @Input() editingForm: boolean;
  @Input() bookID: number;
  private errorMessage: string;
  private book: Book = new Book();

  constructor(private bookService: BookService, private router: Router) { }

  ngOnInit() {
    if(this.editingForm){
      this.bookService.getBook(this.bookID, this.setBook.bind(this), this.bookRetrievalError.bind(this));
    }
  }
  
  setBook(retrievedBook: Book){
    this.book = retrievedBook;
  }

  bookRetrievalError(){
    this.errorMessage = `No book with id #${this.bookID} could be retrieved!`;
    this.router.navigate(["/books"]);
  }

  saveBook(){
    if(this.editingForm){
      this.saveChanges();
    }
    else{
      this.createBook();
    }
  }

  saveChanges(){
    this.bookService.editBook(this.book, this.navigateToBook.bind(this), this.editError.bind(this));
  }

  createBook(){
    let componentScope = this;
    this.bookService.createBook(this.book,
       this.navigateHome.bind(this), this.creationError());
  }

  navigateHome(){
    this.router.navigate(["/books"]);
  }

  navigateToBook(){
    if(this.editingForm){
      this.router.navigate([`/books/${this.bookID}`]);
    }
  }

  creationError(){
    this.errorMessage = "Could not create this book! Try changing the id.";
  }

  editError(){
    this.errorMessage = "Could not save changes! Did you fill out all of the fields in a valid way?";
  }

}
