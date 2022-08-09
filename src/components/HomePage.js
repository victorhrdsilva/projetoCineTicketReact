import axios from 'axios';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Movie({ posterURL, id, title }) {
    return (
        <>
            <Link to={`/sessions/${id}`}>
                <MoviePoster>
                    <img src={posterURL} alt="poster de filme"/>
                </MoviePoster>
                <TitleMovie>{title}</TitleMovie>
            </Link>

        </>
    )
}


export default function HomePage() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const promisse = axios.get("https://mock-api.driven.com.br/api/v7/cineflex/movies");

        promisse.then(res => {
            setData(res.data)
        });
    }, []);

    return (
        <>
            <Title>Selecione o Filme </Title>
            <Movies>
                {data.map((item, index) =>
                    <Movie
                        key={index}
                        posterURL={item.posterURL}
                        title={item.title}
                        id={item.id}
                    />)}
            </Movies>
        </>
    )
}

const Movies = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
`

const MoviePoster = styled.div`
    width: 140px;
    box-sizing: border-box;
    margin: 19px 19px 7px;
    img {
        width: 100%;
        border-radius: 3px;
        box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
    }
`
const Title = styled.h1`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 110px;
    font-size: 24px;
    padding-top: 72px;
    color: #FFFFFF;
    background-color: #343C6F;
    background-image: linear-gradient(#191d31, #343C6F, #272d52);
`
const TitleMovie = styled.p`
    max-width: 120px;
    margin: 0 0 19px 19px;
    color: #FFFFFF;
`