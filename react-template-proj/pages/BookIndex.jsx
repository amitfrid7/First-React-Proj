const { useState, useEffect } = React
const { Link } = ReactRouterDOM
import { bookService } from "../services/book.service.js"
import { BookList } from "../cmps/BookList.jsx"
import { BookFilter } from "../cmps/BookFilter.jsx"
import { showSuccessMsg } from "../services/event-bus.service.js"

export function BookIndex() {
    const [books, setBooks] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())
    const [userMsg, setUserMsg] = useState('')

    useEffect(() => {
        loadBooks()
    }, [filterBy])

    function onSetFilter(fieldsToUpdate) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...fieldsToUpdate }))
    }

    function loadBooks() {
        bookService.query(filterBy)
            .then((books) => {
                setBooks(books)
            })
    }

    function onRemoveBook(bookId) {
        bookService.remove(bookId)
            .then(() => {
                showSuccessMsg(`Book Removed Successfully ${bookId}`)
                setBooks((prevBooks) => {
                    return prevBooks.filter(book => book.id !== bookId)
                })
            })
            .catch((err) => { console.log('err:', err) })
    }

    if (!books) return <div>Loading...</div>
    return (
        <section className="book-index flex flex-column align-center">
            <BookFilter
                onSetFilter={onSetFilter}
                filterBy={filterBy}
            />
            <Link to="/books/edit"><button>Add a book</button></Link>
            <BookList
                books={books}
                onRemoveBook={onRemoveBook}
            />
        </section>)

}