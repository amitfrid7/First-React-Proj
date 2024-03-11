import { LongTxt } from "./LongTxt.jsx"

export function BookDetails({ book, onGoBack }) {

    const bookCondition = getBookCondition()
    const bookPageCount = getPageCountTxt()
    const bookPriceColor = getPriceColor()

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


    return <section className="book-details">
        <h2>{book.title}</h2>
        <h3>{book.subtitle}</h3>
        <h4>Book Condition: {bookCondition}</h4>

        <LongTxt txt={book.description} />
        
        <img src={`../BooksImages/${book.thumbnail}`} alt="" />
        {book.listPrice.isOnSale && (<img src="../BooksImages/sale.png" />)}

        <h5 className={bookPriceColor}>Price: {book.listPrice.amount} {book.listPrice.currencyCode}</h5>
        <h5>{bookPageCount}</h5>
        <button onClick={onGoBack}>Go Back</button>
    </section>
}