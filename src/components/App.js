import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Header from './Header';
import GlobalStyle from '../styled/globalStyles';
import HomePage from './HomePage';
import MovieSessionPage from './MovieSessionPage';
import Footer from './Footer';

export default function App () {
    const [selectedMovie, setSelectedMovie] = useState(false)
    console.log(selectedMovie)

    return (
        <>
        <GlobalStyle />
        <Header/>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />}></Route>
                <Route path="/sessoes/:idMovie" element={<MovieSessionPage selectedMovie={selectedMovie} setSelectedMovie={setSelectedMovie}/>}></Route>

            </Routes>
        </BrowserRouter>
        {/* {selectedMovie ? <Footer selectedMovie={selectedMovie}/> : ""} */}
        </>
    )
}