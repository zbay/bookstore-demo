import { Component, OnInit, OnDestroy } from '@angular/core';
import { Book } from '../shared/models/Book';
import { Subscription } from 'rxjs/Subscription';
import { BookService } from '../shared/services/book.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit, OnDestroy {

  private book: Book;
  private bookID: number;
  private errorMessage: string;
  private bookSubscription: Subscription;
  private idSubscription: Subscription;
  private saveSubscription: Subscription;

  constructor(private bookService: BookService, private route: ActivatedRoute, private router: Router) { 
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
          componentScope.errorMessage = `No book with id #${this.bookID} could be retrieved!`;
          this.router.navigate(["/books"]);
        }
      );
  }

  saveChanges(){
    this.bookService.editBook(this.book)
      .subscribe(function successfulEdit(){
        this.router.navigate(["/books"]);
      },
    function editError(err){
      this.errorMessage = "Could not save changes to this id!";
    });
  }

  ngOnDestroy(){
    this.bookSubscription.unsubscribe();
    this.idSubscription.unsubscribe();
    if(this.saveSubscription){
      this.saveSubscription.unsubscribe();
    }
  }

}
