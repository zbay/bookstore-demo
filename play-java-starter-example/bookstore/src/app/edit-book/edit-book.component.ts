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
  }

  ngOnDestroy(){
    this.idSubscription.unsubscribe();
  }

}
