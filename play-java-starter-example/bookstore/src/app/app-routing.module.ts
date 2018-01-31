import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BookListComponent } from './book-list/book-list.component';
import { NewBookComponent } from './new-book/new-book.component';
import { EditBookComponent } from './edit-book/edit-book.component';
import { BookComponent } from './book/book.component';
import { SingleBookComponent } from './single-book/single-book.component';

const routes: Routes = [{path: '', pathMatch: 'full', component: HomeComponent},
{path: 'books', pathMatch: 'full', component: BookListComponent},
{path: 'books/:id', pathMatch: 'full', component: SingleBookComponent},
{path: 'newBook', pathMatch: 'full', component: NewBookComponent},
{path: 'books/:id/edit', pathMatch: 'full', component: EditBookComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
