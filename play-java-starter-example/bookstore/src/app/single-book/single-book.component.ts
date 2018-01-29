import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Book } from '../shared/models/Book';
import { BookService } from '../shared/services/book.service';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private bookService: BookService, private route: ActivatedRoute) {
    this.idSubscription = this.route.paramMap.subscribe(params => {
      this.bookID = parseInt(params.get('id'));
    });
   }

  ngOnInit() {
    this.bookSubscription = this.bookService.getBook(this.bookID)
      .subscribe(
        function setBook(retrievedBook){
          this.book = retrievedBook;
        }, 
        function handleError(err){
          this.errorMessage = `No book with id #${this.bookID} could be retrieved!`
        }
      );
  }

  ngOnDestroy(){
    this.bookSubscription.unsubscribe();
    this.idSubscription.unsubscribe();
  }

}
