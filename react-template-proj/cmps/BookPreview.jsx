export function BookPreview({ book }) {
    return <article className="book-preview flex flex-column align-center">
        <h2>{book.title}</h2>
        <img src={`../BooksImages/${book.thumbnail}`} alt="" />
        <h5>Price: {book.listPrice.amount} {book.listPrice.currencyCode}</h5>
    </article>
}