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
  private createSubscription: Subscription;
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
    let componentScope = this;
    this.bookService.editBook(this.book)
      .subscribe(function successfulEdit(){
        componentScope.router.navigate(["/books"]);
      },
    function editError(err){
      componentScope.errorMessage = "Could not save changes to this id!";
    });
  }

  createBook(){
    let componentScope = this;
    this.bookService.createBook(this.book)
      .subscribe(function successfulCreate(){
        componentScope.router.navigate(["/books"]);
      },
    function createError(err){
      componentScope.errorMessage = "Could not create this book! Try changing the id.";
    });
  }

  ngOnDestroy(){
    if(this.bookSubscription){
      this.bookSubscription.unsubscribe();
    }
    if(this.createSubscription){
      this.createSubscription.unsubscribe();
    }
  }

}
