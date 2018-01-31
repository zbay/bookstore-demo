import { Component, OnInit, OnDestroy } from '@angular/core';
import { Book } from '../shared/models/Book';
import { Subscription } from 'rxjs/Subscription';
import { BookService } from '../shared/services/book.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit, OnDestroy {

  private bookID: number;
  private idSubscription: Subscription;

  constructor(private bookService: BookService, private route: ActivatedRoute) { 
    this.idSubscription = this.route.paramMap.subscribe(params => {
      this.bookID = parseInt(params.get('id'));
    });
  }

  ngOnInit() {
    /*let componentScope = this;
    this.bookSubscription = this.bookService.getBook(this.bookID)
      .subscribe(
        function setBook(retrievedBook){
          componentScope.book = retrievedBook;
        }, 
        function handleError(err){
          componentScope.errorMessage = `No book with id #${this.bookID} could be retrieved!`;
          componentScope.router.navigate(["/books"]);
        }
      );*/
  }

  /*saveChanges(){
    let componentScope = this;
    console.log(this.book);
    this.bookService.editBook(this.book)
      .subscribe(function successfulEdit(){
        componentScope.router.navigate(["/books"]);
      },
    function editError(err){
      componentScope.errorMessage = "Could not save changes to this id!";
    });
  }*/

  ngOnDestroy(){
    this.idSubscription.unsubscribe();
  }

}
