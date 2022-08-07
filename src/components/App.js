import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Header from './Header';
import GlobalStyle from '../styled/globalStyles';
import HomePage from './HomePage';
import MovieSessionPage from './MovieSessionPage';
import SeatsPage from './SeatsPage';

export default function App() {
    const [selectedMovie, setSelectedMovie] = useState(false)
    const [selectedSession, setSelectedSession] = useState(false)
    console.log(selectedSession)

    return (
        <>
            <GlobalStyle />
            <Header />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage />}></Route>
                    <Route path="/sessions/:idMovie" element={
                        <MovieSessionPage
                            selectedMovie={selectedMovie}
                            setSelectedMovie={setSelectedMovie}
                        />}></Route>
                    <Route path='/seats/:idSessions' element={
                        <SeatsPage
                            selectedMovie={selectedMovie}
                            selectedSession={selectedSession}
                            setSelectedSession={setSelectedSession}
                        />}></Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}