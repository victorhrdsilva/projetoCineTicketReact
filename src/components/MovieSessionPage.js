import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"
import axios from "axios";
import styled from "styled-components";
import Footer from "./Footer";

function Session({weekday, date, showtimes}) {
    return (
        <div>
            <p>{weekday} - {date}</p>
            <SessionTimes>
                {showtimes.map((item, index) => {
                    return (
                        <Link key={index} to={`/seats/${item.id}`}>
                            <SessionButton>{item.name}</SessionButton>
                        </Link>
                    )})}
            </SessionTimes>
        </div>
    )
}

export default function MovieSessionPage() {
    const parames = useParams();
    const [data, setData] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(false)

    useEffect(() => {
        const promisse = axios.get(`https://mock-api.driven.com.br/api/v7/cineflex/movies/${parames.idMovie}/showtimes`);

        promisse.then(res => {
            setData(res.data.days)
            setSelectedMovie(res.data)
        });
    }, []);

    return (
        <>
            <Title>Selecione o Filme</Title>
            <Sessions>
                {data.map((item, index) => 
                <Session 
                key={index}
                weekday={item.weekday}
                date={item.date}
                showtimes={item.showtimes}
                />
                )}
            </Sessions>
            { selectedMovie ? (<Footer posterURL={selectedMovie.posterURL} title={selectedMovie.title}></Footer>) : ""}
        </>
    )
}
const Title = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Roboto', sans-serif;
    height: 110px;
    font-size: 24px;
    padding-top: 72px;
`
const Sessions = styled.div`
    font-size: 20px;
    margin: 0 25px;
    padding-bottom: 140px;
`
const SessionTimes = styled.div`
    display: flex;
    flex-wrap: wrap;
`
const SessionButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 82px;
    height: 43px;
    font-size: 18px;
    background-color: #E8833A;
    color: #FFFFFF;
    border-radius: 3px;
    margin: 22px 8px 22px 0;
    text-decoration: none;
    border: none;
`