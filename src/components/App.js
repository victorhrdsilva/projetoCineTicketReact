import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Header from './Header';
import GlobalStyle from '../styled/globalStyles';
import HomePage from './HomePage';
import MovieSessionPage from './MovieSessionPage';
import SeatsPage from './SeatsPage';
import Sucess from './Sucess'

export default function App() {
    const [postData, setPostData] = useState(false);
    const [movieInformation, setMovieInformation] = useState([]);
    const [seatsNumber, setSeatsNumber] = useState([])

    return (
        <>
            <GlobalStyle />
            <Header />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage />}></Route>
                    <Route path="/sessions/:idMovie" element={<MovieSessionPage />}></Route>
                    <Route path='/seats/:idSessions' element=
                        {<SeatsPage
                            setPostData={setPostData}
                            setMovieInformation={setMovieInformation}
                            setSeatsNumber={setSeatsNumber}
                            seatsNumber={seatsNumber} 
                            postData={postData}/>}></Route>
                    <Route path='/sucess' element=
                        {<Sucess
                            postData={postData}
                            movieInformation={movieInformation}
                            seatsNumber={seatsNumber} />}></Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}