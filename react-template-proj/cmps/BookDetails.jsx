const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouter
const { Link } = ReactRouterDOM

import { bookService } from "../services/book.service.js"
import { LongTxt } from "./LongTxt.jsx"

export function BookDetails() {

    const [isLoading, setIsLoading] = useState(true)
    const [book, setBook] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadBook()
    }, [params.bookId])

    function loadBook() {
        setIsLoading(true)
        bookService.get(params.bookId)
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

    if (isLoading) return <div>Loading...</div>

    return <section className="book-details">
        <Link to={`/books/edit/${params.bookId}`}><button>Edit Book</button></Link>
        <h2>{book.title}</h2>
        <h3>{book.subtitle}</h3>
        <h4>Book Condition: {getBookCondition()}</h4>

        <LongTxt txt={book.description} />

        <img src={`../BooksImages/${book.thumbnail}`} alt="" />
        {book.listPrice.isOnSale && (<img src="../BooksImages/sale.png" />)}

        <h5 className={getPriceColor()}>Price: {book.listPrice.amount} {book.listPrice.currencyCode}</h5>
        <h5>{getPageCountTxt()}</h5>
        <Link to="/books"><button>Go Back</button></Link>
    </section>
}