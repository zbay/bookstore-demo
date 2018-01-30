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
  private bookSubscription: Subscription;
  private idSubscription: Subscription;
  private deleteSubscription: Subscription;

  constructor(private bookService: BookService, private router: Router, private route: ActivatedRoute) {
    this.idSubscription = this.route.paramMap.subscribe(params => {
      this.bookID = parseInt(params.get('id'));
    });
   }

  ngOnInit() {
    let componentScope = this;
    this.bookSubscription = this.bookService.getBook(this.bookID)
      .subscribe(
        function setBook(retrievedBook){
          componentScope.book = retrievedBook;
        }, 
        function handleError(err){
          componentScope.errorMessage = `No book with id #${this.bookID} could be retrieved!`
        }
      );
  }

  deleteBook(){
    this.deleteSubscription = this.bookService.deleteBook(this.bookID)
      .subscribe(function successfulDelete(){
        this.router.navigate(["/books"]);
      },
    function showError(){
      this.errorMessage = "Could not delete this book!";
    });
  }

  ngOnDestroy(){
    this.bookSubscription.unsubscribe();
    this.idSubscription.unsubscribe();
    if(this.deleteSubscription){
      this.deleteSubscription.unsubscribe();
    }
  }

}
