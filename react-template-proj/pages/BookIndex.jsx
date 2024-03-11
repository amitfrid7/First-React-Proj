const { useState, useEffect } = React
import { bookService } from "../services/book.service.js"
import { BookList } from "../cmps/BookList.jsx"
import { BookPreview } from "../cmps/BookPreview.jsx"
import { BookDetails } from "../cmps/BookDetails.jsx"
import { BookFilter } from "../cmps/BookFilter.jsx"

export function BookIndex() {
    const [books, setBooks] = useState(null)
    // const [selectedBook, setSelectedBook] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

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
                setBooks((prevBooks) => { return prevBooks.filter(book => book.id !== bookId) })
            })
            .catch((err) => { console.log('err:', err) })
    }

    // function onSelectBook(book) {
    //     setSelectedBook(book)
    // }

    if (!books) return <div>Loading...</div>
    return (
        <section className="book-index flex flex-column align-center">
            <BookFilter
                onSetFilter={onSetFilter}
                filterBy={filterBy}
            />
            <BookList
                books={books}
                onRemoveBook={onRemoveBook}
                // onUpdateBook={onUpdateBook}
                // onSelectBook={onSelectBook}
            />

            {/* {
                selectedBook &&
                <BookDetails
                    book={selectedBook}
                    onGoBack={() => onSelectBook(null)}
                />
            } */}
        </section>)

}