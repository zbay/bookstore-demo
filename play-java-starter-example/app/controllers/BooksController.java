package controllers;

/*TODO: 1. CSRF
5. Environment variables for Github
6. Refactor to use Angular
7. Refactor to use Arango
*/
/*
Questions:
1. Where do I declare my environment variables? Want to protect some data in application.conf, without .gitignore
*/
// sbt run

import play.mvc.*;
import java.util.*;
import models.Book;
import views.html.Books.*;
import play.data.*;
import javax.inject.*;
import play.libs.Json;
import com.fasterxml.jackson.databind.JsonNode;

public class BooksController extends Controller {

    @Inject
    FormFactory formFactory;

    // all books
    public Result index(){
        List<Book> books = Book.find.all();
        return ok(index.render(books));
    }

    public Result allBooks(){
        List<Book> books = Book.find.all();
        return ok(Json.toJson(books));
    }

    public Result create(){
        Form<Book> bookForm = formFactory.form(Book.class);
        return ok(create.render(bookForm));
    }

    public Result save(){
        Form<Book> bookForm = formFactory.form(Book.class).bindFromRequest();
        if(bookForm.hasErrors()){
            flash("danger", "Please correct the form below!");
            return badRequest(create.render(bookForm));
        }
        Book book = bookForm.get();
        book.save();
        flash("success", "Book successfully saved!");
        return redirect(routes.BooksController.index());
    }

    public Result createBook(){
        Form<Book> bookForm = formFactory.form(Book.class).bindFromRequest();
        if(bookForm.hasErrors()){
            System.out.println("Bad book!");
            return badRequest();
        }
        Book book = bookForm.get();
        book.save();
        /*JsonNode bookObj = request().body().asJson();
        Book existingBook = Book.find.byId(bookObj.findPath("id").intValue());
        if(existingBook != null){
            return internalServerError();
        }
        Book newBook = new Book();
        newBook.setId(Integer.parseInt(bookObj.findPath("id").textValue()));
        newBook.setTitle(bookObj.findPath("title").textValue());
        newBook.setAuthor(bookObj.findPath("author").textValue());
        newBook.setPrice(Integer.parseInt(bookObj.findPath("price").textValue()));
        newBook.save();*/

        return ok();
    }

    public Result edit(Integer id){
        Book book = Book.find.byId(id);
        if(book == null){
            return notFound(views.html.Errors._404.render());
        }
        Form<Book> bookForm = formFactory.form(Book.class).fill(book);
        return ok(edit.render(bookForm));
    }

    public Result update(){
        Form<Book> bookForm = formFactory.form(Book.class).bindFromRequest();
        if(bookForm.hasErrors()){
            flash("danger", "Please correct the form below!");
            return badRequest(edit.render(bookForm));
        }
        Book book = bookForm.get();
        Book oldBook = Book.find.byId(book.id);
        if(oldBook == null){
            flash("danger", "Book not found!");
            return notFound(views.html.Errors._404.render());
        }

        /*oldBook.title = book.title;
        oldBook.author = book.author;
        oldBook.price = book.price;*/

        oldBook.setTitle(book.title);
        oldBook.setAuthor(book.author);
        oldBook.setPrice(book.price);
        oldBook.save();
        flash("success", "Book successfully saved!");

        return ok();
    }

    public Result updateBook(Integer id){
        Form<Book> bookForm = formFactory.form(Book.class).bindFromRequest();
        if(bookForm.hasErrors()){
            return badRequest();
        }
        Book book = bookForm.get();
        //JsonNode book = request().body().asJson();
        Book oldBook = Book.find.byId(id);
        if(oldBook == null) {
            return notFound();
        }

        /*oldBook.setTitle(book.findPath("title").textValue());
        oldBook.setAuthor(book.findPath("author").textValue());
        oldBook.setPrice(Integer.parseInt(book.findPath("price").textValue()));
        oldBook.save();*/
        oldBook.setTitle(book.title);
        oldBook.setAuthor(book.author);
        oldBook.setPrice(book.price);
        oldBook.save();

        return ok();
    }

    public Result destroy(Integer id){
        Book book = Book.find.byId(id);
        if(book == null){
            flash("danger", "Book not found!");
            return notFound(views.html.Errors._404.render());
        }
        book.delete();
        flash("success", "Book deleted!");
        return ok();
        //return redirect(routes.BooksController.index());
    }

    public Result deleteBook(Integer id){
        Book book = Book.find.byId(id);
        if(book == null){
            return notFound();
        }
        book.delete();
        return ok();
        //return redirect(routes.BooksController.index());
    }

    public Result show(Integer id){
        Book book = Book.find.byId(id);
        if(book == null){
            return notFound(views.html.Errors._404.render());
        }
        return ok(show.render(book));
    }

    public Result oneBook(Integer id){
        Book book = Book.find.byId(id);
        if(book == null){
            return notFound(views.html.Errors._404.render());
        }
        return ok(Json.toJson(book));
    }


}
