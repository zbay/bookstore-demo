import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import 'hammerjs';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatTabsModule, MatInputModule, MatSnackBarModule, MatIconModule,
   MatButtonModule, MatDialogModule, MatToolbarModule, MatTooltipModule, MatCardModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';

import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookFormComponent } from './book-form/book-form.component';
import { NewBookComponent } from './new-book/new-book.component';
import { EditBookComponent } from './edit-book/edit-book.component';
import { BookComponent } from './book/book.component';
import { BookService } from './shared/services/book.service';
import { SingleBookComponent } from './single-book/single-book.component';
import { NavService } from './shared/services/nav.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    BookListComponent,
    BookFormComponent,
    NewBookComponent,
    EditBookComponent,
    BookComponent,
    SingleBookComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatCardModule,
    MatTabsModule, MatIconModule,
    MatInputModule, MatSnackBarModule,
    MatButtonModule, MatDialogModule,
    MatToolbarModule, MatTooltipModule
  ],
  providers: [BookService, NavService],
  bootstrap: [AppComponent]
})
export class AppModule { }
