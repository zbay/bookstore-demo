import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Book } from '../shared/models/Book';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  @Input() book: Book;

  constructor() { }

  ngOnInit() {
  }

}
