import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BookListComponent } from './book-list/book-list.component';
import { NewBookComponent } from './new-book/new-book.component';
import { EditBookComponent } from './edit-book/edit-book.component';
import { BookComponent } from './book/book.component';

const routes: Routes = [{path: '', pathMatch: 'full', component: HomeComponent},
{path: 'books', pathMatch: 'full', component: BookListComponent},
{path: 'books/:id', pathMatch: 'full', component: BookComponent},
{path: 'books/create', pathMatch: 'full', component: NewBookComponent},
{path: 'books/edit/:id', pathMatch: 'full', component: EditBookComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
