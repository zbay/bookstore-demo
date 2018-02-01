import { Component, OnInit } from '@angular/core';
import { BookService } from '../shared/services/book.service';
import { StatusState } from '../shared/models/StatusState';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-status-bar',
  templateUrl: './status-bar.component.html',
  styleUrls: ['./status-bar.component.css']
})
export class StatusBarComponent implements OnInit {

  private status: StatusState;
  private statusSubscription: Subscription;

  constructor(private bookService: BookService) { }

  ngOnInit() {
    this.statusSubscription = this.bookService.getStatus().subscribe((currentStatus) => {
      this.status = currentStatus;
    },
    (error) => {
      console.error(error);
    });
  }

  close(){
    this.bookService.closeStatus();
  }

  ngOnDestroy(){
    this.statusSubscription.unsubscribe();
  }

}
