const Router = ReactRouterDOM.HashRouter
const { Route, Routes } = ReactRouterDOM

import { AppHeader } from './cmps/AppHeader.jsx'
import { Home } from './pages/Home.jsx'
import { AboutUs } from './pages/AboutUs.jsx'
import { BookIndex } from './pages/BookIndex.jsx'
import { BookDetails } from './cmps/BookDetails.jsx'
import { UserMsg } from './cmps/UserMsg.jsx'

export function App() {

    return <Router>
        <section className="app">
            <AppHeader />

            <main className="container">

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<AboutUs />} />
                    <Route path="/books" element={<BookIndex />} />
                    <Route path="/books/:bookId" element={<BookDetails />} />

                </Routes>

            </main>

            <UserMsg />
        </section>
    </Router>
}