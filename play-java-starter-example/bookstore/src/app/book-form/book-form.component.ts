import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { BookService } from '../shared/services/book.service';
import { Router } from '@angular/router';
import { Book } from '../shared/models/Book';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit, OnDestroy {
  @Input() editingForm: boolean;
  @Input() bookID: number;
  private errorMessage: string;
  private bookSubscription: Subscription;
  private saveSubscription: Subscription;
  private book: Book = new Book();

  constructor(private bookService: BookService, private router: Router) { }

  ngOnInit() {
    let componentScope = this;
    if(this.editingForm){
      this.bookSubscription = this.bookService.getBook(this.bookID)
        .subscribe(
          function setBook(retrievedBook){
            componentScope.book = retrievedBook;
          }, 
          function handleError(err){
            componentScope.errorMessage = `No book with id #${this.bookID} could be retrieved!`;
            componentScope.router.navigate(["/books"]);
          }
        );
    }
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

  ngOnDestroy(){
    if(this.bookSubscription){
      this.bookSubscription.unsubscribe();
    }
  }

}
