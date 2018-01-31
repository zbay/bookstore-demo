import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Book } from '../shared/models/Book';
import { BookService } from '../shared/services/book.service';
import { ActivatedRoute, Router } from '@angular/router';
//import { redirectToList } from '../shared/functions/RedirectToList';

@Component({
  selector: 'app-single-book',
  templateUrl: './single-book.component.html',
  styleUrls: ['./single-book.component.css']
})
export class SingleBookComponent implements OnInit, OnDestroy {
  
  private book: Book;
  private bookID: number;
  private errorMessage: string;
  private idSubscription: Subscription;
  private deleteSubscription: Subscription;

  constructor(private bookService: BookService, private router: Router, private route: ActivatedRoute) {
    this.idSubscription = this.route.paramMap.subscribe(params => {
      this.bookID = parseInt(params.get('id'));
    });
   }

  ngOnInit() {
    this.bookService.getBook(this.bookID, this.setBook.bind(this), this.bookRetrievalError.bind(this));
  }

  setBook(retrievedBook: Book){
    this.book = retrievedBook;
  }

  bookRetrievalError(){
    this.errorMessage = `No book with id #${this.bookID} could be retrieved!`;
    this.router.navigate(["/books"]);
  }

  deleteBook(){
    let componentScope = this;
    this.deleteSubscription = this.bookService.deleteBook(this.bookID)
      .subscribe(function successfulDelete(){
        componentScope.router.navigate(["/books"]);
      },
    function showError(err){
      componentScope.errorMessage = "Could not delete this book!";
    });
  }

  goEdit(){
    this.router.navigate([`/books/${this.bookID}/edit`]);
  }

  ngOnDestroy(){
    this.idSubscription.unsubscribe();
    if(this.deleteSubscription){
      this.deleteSubscription.unsubscribe();
    }
  }

}
