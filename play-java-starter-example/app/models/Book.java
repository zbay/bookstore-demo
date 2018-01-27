package models;
//import java.util.*;
import io.ebean.Model;
import io.ebean.Finder;
import javax.persistence.*;
import play.data.validation.Constraints;

@Entity
public class Book extends Model{

    @Id
    public Integer id;

    @Constraints.Required
    @Constraints.MinLength(5)
    @Constraints.MaxLength(255)
    public String title;

    @Constraints.Required
    @Constraints.Min(1)
    @Constraints.Max(9999)
    public Integer price;

    @Constraints.Required
    @Constraints.MaxLength(255)
    public String author;

    public static Finder<Integer, Book> find = new Finder<>(Book.class);

    /*public Book(){}

    public Book(Integer id, String title, Integer price, String author){
        this.id = id;
        this.title = title;
        this.price = price;
        this.author = author;
    }

    private static Set<Book> books;

    static{
        books = new HashSet<Book>();
        books.add(new Book(1, "Java", 3, "Java McJavster"));
        books.add(new Book(2, "JavaScript", 5, "Java McScript"));
    }

    public static Set<Book> setOfBooks(){
        return books;
    }

    public static Book findById(Integer id){
        //foreach loop doesn't work
        Iterator<Book> iterator = books.iterator();
        while (iterator.hasNext()) {
            Book nextBook = iterator.next();
            if(nextBook != null && nextBook.id.equals(id)){
                return nextBook;
            }
        }
        return null;
    }

    public static void add(Book book){
        books.add(book);
    }

    public static boolean remove(Book book){
        return books.remove(book);
    }*/
}