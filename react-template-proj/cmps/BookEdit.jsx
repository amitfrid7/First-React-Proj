const { useState, useEffect } = React
const { useNavigate, useParams } = ReactRouter

import { bookService } from "../services/book.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

export function BookEdit({ onCancelEdit }) {

    const [bookToEdit, setBookToEdit] = useState(bookService.getEmptyBook())
    const navigate = useNavigate()
    const { bookId } = useParams()

    useEffect(() => {
        if (bookId) loadBook()
    }, [])

    function loadBook() {
        bookService.get(bookId)
            .then(book => setBookToEdit(book))
            .catch(() => {
                navigate('/books')
            })
    }

    function onSaveBook(ev) {
        ev.preventDefault()
        bookService.save(bookToEdit)
            .then(() => {
                navigate('/books')
                showSuccessMsg('Book Saved Successfully')
            })
            .catch(() => {
                showErrorMsg('Could not save book')
            })
    }

    function handleChange({ target }) {
        let { value, name: field } = target

        switch (field) {
            case "title":
                value = target.value || bookToEdit.title
                break
            case "price":
                value = +target.value || bookToEdit.listPrice.amount
                break
        }

        setBookToEdit((prevBook) => ({ ...prevBook, [field]: value }))

        if (field === "price") {
            setBookToEdit((prevBook) => ({
                ...prevBook,
                listPrice: { ...bookToEdit.listPrice, amount: value },
            }))
        } else {
            setBookToEdit((prevBook) => ({ ...prevBook, [field]: value }))
        }
    }
    return (
        <section className="book-edit flex flex-column align-center">
            <h2>Edit Book</h2>
            <div className="book-edit-container">
                <form onSubmit={onSaveBook}>
                    <span className="book-details-info-title">Title:</span>
                    <span className="book-details-info-text">
                        <input
                            type="text"
                            placeholder="Enter New Title"
                            name="title"
                            value={bookToEdit.title}
                            onChange={handleChange}
                        />
                    </span>
                    <span className="book-details-info-title">Price:</span>
                    <span className="book-details-info-text">
                        <input
                            type="text"
                            placeholder="Set Price"
                            name="price"
                            onChange={handleChange}
                            value={bookToEdit.listPrice.amount}
                        />
                    </span>
                    <div className="book-edit-actions-container">
                        <button className="save-edit-btn" onClick={onSaveBook}> Save
                        </button>
                        <button className="cancel-edit-btn" onClick={onCancelEdit}> Cancel
                        </button>
                    </div>
                </form>
            </div>
        </section>
    )
}