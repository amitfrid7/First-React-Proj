const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouter
const { Link, Outlet } = ReactRouterDOM

import { bookService } from "../services/book.service.js"
import { LongTxt } from "./LongTxt.jsx"

import { AddReview } from "./AddReview.jsx"
import { ReviewList } from './ReviewList.jsx'

export function BookDetails() {
    const [isLoading, setIsLoading] = useState(true)
    const [book, setBook] = useState(null)
    const [isOnReview, setIsOnReview] = useState(false)

    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadBook()
    }, [params.bookId])

    function loadBook() {
        setIsLoading(true)
        bookService
            .get(params.bookId)
            .then(book => setBook(book))
            .catch((err) => {
                console.log('Had issues loading book', err)
                navigate('/books')
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    function getPageCountTxt() {
        if (book.pageCount > 500) return 'Serious Reading'
        else if (book.pageCount > 200) return 'Descent Reading'
        else if (book.pageCount < 100) return 'Light Reading'
    }

    function getBookCondition() {
        const currYear = new Date().getFullYear()
        if ((currYear - book.publishedDate) >= 10) return 'Vintage'
        else if ((currYear - book.publishedDate) < 2) return 'New'
    }

    function getPriceColor() {
        if (book.listPrice.amount > 150) return 'red'
        if (book.listPrice.amount < 20) return 'green'
    }

    function onAddReview(review) {
        bookService
            .addReview(params.bookId, review)
            .then(savedBook => {
                setBook(savedBook)
                showSuccessMsg(`Review added successfully to ${savedBook.title}`)
            })
            .catch(err => {
                console.log('Had issues with adding review:', err)
                showErrorMsg('Could not add review')
            })
            .finally(() => setIsOnReview(false))
    }

    function onRemoveReview(reviewId) {
        bookService
            .removeReview(book.id, reviewId)
            .then(savedBook => {
                setBook(savedBook)
                showSuccessMsg(`Review removed successfully from ${savedBook.title}`)
            })
            .catch(err => {
                console.log('Had issues with removing review:', err)
                showErrorMsg('Could not remove review')
            })
            .finally(() => setIsOnReview(false))
    }

    if (isLoading) return <div>Loading...</div>

    return <section className="book-details flex justify-between align-center">
        <div className="details-container">
            <div className="next-prev flex justify-between">
                <Link to={`/books/${book.prevBookId}`}><button>Prev</button></Link>
                <Link to={`/books/${book.nextBookId}`}><button>Next</button></Link>
            </div>
            {isOnReview && (
                <AddReview
                    bookId={params.bookId}
                    addReview={onAddReview}
                    onCloseReview={() => setIsOnReview(false)}
                />
            )}

            <h2>{book.title}</h2>
            <h3>{book.subtitle}</h3>
            <h4>Book Condition: {getBookCondition()}</h4>

            <LongTxt txt={book.description} />

            <h5 className={getPriceColor()}>Price: {book.listPrice.amount} {book.listPrice.currencyCode}</h5>
            <h5>{getPageCountTxt()}</h5>

            {book.reviews && book.reviews.length && (
                <ReviewList book={book} onRemoveReview={onRemoveReview} />
            )}

            <button
                onClick={() => setIsOnReview(prevIsOnReview => !prevIsOnReview)}
            >
                Add Review
            </button>
            <Link to={`/books/edit/${params.bookId}`}><button>Edit Book</button></Link>
            <Link to="/books"><button>Go Back</button></Link>
        </div>
        <div className="img-container">
            <img src={`../BooksImages/${book.thumbnail}`} alt="" />
            {book.listPrice.isOnSale && (<img src="../BooksImages/sale.png" className="on-sale-img" />)}
        </div>

    </section>
}