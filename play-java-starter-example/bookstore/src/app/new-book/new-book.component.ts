import { Component, OnInit } from '@angular/core';
import { BookService } from '../shared/services/book.service';

@Component({
  selector: 'app-new-book',
  templateUrl: './new-book.component.html',
  styleUrls: ['./new-book.component.css']
})
export class NewBookComponent implements OnInit {

  constructor(private bookService: BookService) { 
  }

  ngOnInit() {
    this.bookService.closeStatus();
  }

}
