const { NavLink } = ReactRouterDOM
const { useNavigate } = ReactRouter

export function AppHeader() {

    const navigate = useNavigate()

    function onGoHome() {
        navigate('/')
    }

    return <header className="app-header">
        <h1 onClick={onGoHome}>Miss Book</h1>

        <nav className="app-nav">
            <NavLink to="/">Home</NavLink> |
            <NavLink to="/about">About</NavLink> |
            <NavLink to="/books">Books</NavLink>

        </nav>
    </header>
}