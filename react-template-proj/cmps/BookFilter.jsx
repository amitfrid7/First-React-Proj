const { useEffect, useState } = React


export function BookFilter({ onSetFilter, filterBy }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function onFilter(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }

    function handleChange({ target }) {
        let { value, name: field, type } = target
        if (type === 'number') value = +value

        setFilterByToEdit((prevFilterBy) => ({ ...prevFilterBy, [field]: value }))
    }

    return <section className="book-filter flex flex-column align-center">
        <h2>Filter our books</h2>

        <form onSubmit={onFilter}>
            <label htmlFor="title">Title</label>
            <input type="text"
                name="txt"
                id="title"
                value={filterByToEdit.txt}
                onChange={handleChange}
                placeholder="By Title"/>

            <label htmlFor="price">Price</label>
            <input
                type="number"
                name="price"
                id="price"
                value={filterByToEdit.price}
                onChange={handleChange}
                placeholder="By Price"/>

            <label htmlFor="onSale"></label>
            <input
             type="checkbox" 
             name="onSale" 
             id="onSale" />
        </form>
    </section>
}