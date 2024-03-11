import { bookService } from "../services/book.service.js"
import { BookPreview } from "./BookPreview.jsx"

export function BookList({ books, onRemoveBook, onUpdateBook, onSelectBook }) {

    if (!books.length) return <div>No Books to show</div>
    return <ul className="book-list clean-list flex justify-center">
        {
            books.map((book, idx) => 
                    <li key={book.id} className="flex flex-column align-center">
                        <BookPreview book={book} idx={idx} />
                        <div className="book-action">
                            <button className="remove-btn" onClick={() => onRemoveBook(book.id)}>X</button>
                            <button onClick={() => { onSelectBook(book) }}>Select</button>
                        </div>
                    </li>)
        }
    </ul>
}