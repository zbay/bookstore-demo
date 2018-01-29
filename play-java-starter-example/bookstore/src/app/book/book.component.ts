import { Component, OnInit, OnDestroy } from '@angular/core';
import { BookService } from '../shared/services/book.service';
import { Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  @Input() bookID: number;
  private deleteSubscription: Subscription;
  private errorMessage;

  constructor(private bookService : BookService, private router: Router) { }

  ngOnInit() {
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
    if(this.deleteSubscription){
      this.deleteSubscription.unsubscribe();
    }
  }
}
